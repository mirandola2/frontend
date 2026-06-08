import { readFileSync, writeFileSync, renameSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

const contentDir = new URL('../content', import.meta.url).pathname

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      yield* walk(full)
    } else if (extname(full) === '.md') {
      yield full
    }
  }
}

function toPascalCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function componentNameFromTag(tag) {
  const match = tag.match(/^:+(\w+)/)
  if (!match) return null
  let name = match[1]
  if (name === name.toLowerCase() && name !== 'LnkYearGrid' && name !== 'TableOfContents') {
    name = toPascalCase(name)
  }
  return name
}

function extractAttributes(mdc) {
  const attrMatch = mdc.match(/^:+(\w+)\s*\{(.*)\}\s*$/)
  if (!attrMatch) return ''
  const raw = attrMatch[2].trim()
  if (!raw) return ''

  const attrs = []
  let i = 0
  while (i < raw.length) {
    while (i < raw.length && raw[i] === ' ') i++
    if (i >= raw.length) break

    if (raw[i] === ':') {
      i++
      let bindKey = ''
      while (i < raw.length && raw[i] !== '=' && raw[i] !== ' ' && raw[i] !== '}') {
        bindKey += raw[i]
        i++
      }
      while (i < raw.length && raw[i] === ' ') i++
      let hasEq = false
      if (i < raw.length && raw[i] === '=') {
        hasEq = true
        i++
        while (i < raw.length && raw[i] === ' ') i++
      }
      if (i < raw.length && (raw[i] === "'" || raw[i] === '"' || raw[i] === '[')) {
        const quote = raw[i]
        if (quote === '[') {
          const end = raw.indexOf(']', i)
          attrs.push(`${bindKey}={${raw.slice(i, end + 1)}}`)
          i = end + 1
        } else {
          const end = raw.indexOf(quote, i + 1)
          if (end === -1) break
          attrs.push(`${bindKey}={${raw.slice(i, end + 1)}}`)
          i = end + 1
        }
      } else if (hasEq) {
        let val = ''
        while (i < raw.length && raw[i] !== ' ' && raw[i] !== '}') {
          val += raw[i]
          i++
        }
        attrs.push(`${bindKey}={${val}}`)
      }
      continue
    }

    let key = ''
    while (i < raw.length && raw[i] !== '=' && raw[i] !== ' ' && raw[i] !== '}') {
      key += raw[i]
      i++
    }

    if (key === '') continue

    while (i < raw.length && raw[i] === ' ') i++

    if (i >= raw.length || raw[i] !== '=') {
      attrs.push(key)
      continue
    }

    i++
    while (i < raw.length && raw[i] === ' ') i++

    if (i >= raw.length) {
      attrs.push(key)
      continue
    }

    const quote = raw[i]
    if (quote === "'" || quote === '"') {
      const end = raw.indexOf(quote, i + 1)
      if (end === -1) break
      const val = raw.slice(i + 1, end)
      if (val.startsWith(':') || val.startsWith('[')) {
        attrs.push(`${key}={${val}}`)
      } else if (val === 'true' || val === 'false') {
        attrs.push(key)
      } else if (!isNaN(Number(val))) {
        attrs.push(`${key}={${val}}`)
      } else {
        attrs.push(`${key}="${val}"`)
      }
      i = end + 1
    } else if (quote === '[') {
      const end = raw.indexOf(']', i)
      if (end === -1) break
      attrs.push(`${key}={${raw.slice(i, end + 1)}}`)
      i = end + 1
    } else {
      let val = ''
      while (i < raw.length && raw[i] !== ' ' && raw[i] !== '}') {
        val += raw[i]
        i++
      }
      if (val === 'true') {
        attrs.push(key)
      } else if (val === 'false') {
        // omit false booleans
      } else if (!isNaN(Number(val)) && val !== '') {
        attrs.push(`${key}={${val}}`)
      } else {
        attrs.push(`${key}="${val}"`)
      }
    }
  }

  return ' ' + attrs.join(' ')
}

function isSelfClosing(name) {
  const selfClosing = ['Fig', 'Staff', 'TableOfContents', 'Alci', 'Morse', 'LnkYearGrid', 'GroupSize', 'CodiceSocio', 'MyDiv']
  return selfClosing.includes(name)
}

function convertLine(line, stack) {
  const trimmed = line.trim()

  if (/^:::$/.test(trimmed)) {
    if (stack.length > 0 && stack[stack.length - 1].level === 3) {
      const { name } = stack.pop()
      const indent = line.match(/^\s*/)[0]
      return indent + `</${name}>`
    }
    return line
  }

  if (/^::$/.test(trimmed)) {
    if (stack.length > 0 && stack[stack.length - 1].level === 2) {
      const { name } = stack.pop()
      const indent = line.match(/^\s*/)[0]
      return indent + `</${name}>`
    }
    return line
  }

  if (/^:::(\w+)/.test(trimmed)) {
    const name = componentNameFromTag(trimmed)
    if (name) {
      const attrs = extractAttributes(trimmed)
      const indent = line.match(/^\s*/)[0]
      stack.push({ name, level: 3 })
      if (isSelfClosing(name)) {
        stack.pop()
        return indent + `<${name}${attrs} />`
      }
      return indent + `<${name}${attrs}>`
    }
    return line
  }

  if (/^::(\w+)/.test(trimmed)) {
    const name = componentNameFromTag(trimmed)
    if (name) {
      const attrs = extractAttributes(trimmed)
      const indent = line.match(/^\s*/)[0]
      stack.push({ name, level: 2 })
      if (isSelfClosing(name)) {
        stack.pop()
        return indent + `<${name}${attrs} />`
      }
      return indent + `<${name}${attrs}>`
    }
    return line
  }

  if (/^:([a-zA-Z]\w+)/.test(trimmed)) {
    const name = componentNameFromTag(trimmed)
    if (name) {
      const attrs = extractAttributes(trimmed)
      const indent = line.match(/^\s*/)[0]
      return indent + `<${name}${attrs} />`
    }
    return line
  }

  return line
}

function convertFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const stack = []
  const result = lines.map(line => convertLine(line, stack))

  if (stack.length > 0) {
    console.warn(`Warning: ${filePath} has ${stack.length} unclosed component(s): ${stack.map(s => s.name).join(', ')}`)
  }

  writeFileSync(filePath, result.join('\n'), 'utf-8')
}

function renameToMdx(filePath) {
  const newPath = filePath.replace(/\.md$/, '.mdx')
  renameSync(filePath, newPath)
  return newPath
}

let count = 0
for (const file of walk(contentDir)) {
  console.log(`Converting: ${file}`)
  convertFile(file)
  renameToMdx(file)
  count++
}

console.log(`\nDone! Converted ${count} files.`)
