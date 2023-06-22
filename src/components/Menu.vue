<script setup>
import { Navbar, NavbarLogo, NavbarCollapse, NavbarLink } from 'flowbite-vue'
import { Dropdown, ListGroup, ListGroupItem } from 'flowbite-vue'

</script>
<template>
    <Navbar>
      <template #logo>
        <NavbarLogo link="/" alt="logo" image-url="logo_colored.png">
          Agesci Mirandola 2
        </NavbarLogo>
      </template>
      <template #default="{isShowMenu}">
        <NavbarCollapse :isShowMenu="isShowMenu">
          <NavbarLink isActive link="#">Home</NavbarLink>
          <NavbarLink link="#">L'Associazione</NavbarLink>
          <NavbarLink link="#">Le Branche</NavbarLink>
          <NavbarLink link="#">Contatti</NavbarLink>
        </NavbarCollapse>
      </template>
    </Navbar>
</template>