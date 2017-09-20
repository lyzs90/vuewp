<template>
  <div class="RootWrap">
    <header-bar></header-bar>
    <section class="MainSection">
      <transition name="fade">
        <router-view class="view"></router-view>
      </transition>
    </section>
    <footer-bar></footer-bar>
  </div>
</template>

<script>

import HeaderBar from '../components/Header.vue'
import FooterBar from '../components/Footer.vue'

export default {

  components: { HeaderBar, FooterBar }

}

</script>

<style lang="stylus">

*
  box-sizing: border-box
  margin: 0
  padding: 0

body
  background: #f6f5f2
  font-family: 'Montserrat', Helvetica, sans-serif
  font-weight: 300
  font-size: 0.9em
  height: 100%

a
  text-decoration: none

p
  color: #444
  font-family: 'Open Sans', sans-serif, Arial

ul
  padding: 1em

ol
  @extend ul

h1, h2, h3, h4, h5, h6
  color: #343434
  transition: all 0.5s ease-in-out

img
  display: block
  width: 100%

button
  background: transparent

.RootWrap
  display: flex
  flex-direction: column

.Container
  margin: 0 auto
  max-width: 80vw

.Row
  display: flex
  flex-flow: row wrap
  margin: 0 -0.8em
  margin-bottom: 0.8em
  &:last-child
    margin-bottom: 0

.ColumnFull
  padding: 1em
  width: 100%

.is--center-vertical
  align-items: center

.Btn
  border-radius: 2em
  padding: 0.5em 1.5em
  font-size: 0.9em
  transition: all 0.5s ease-in-out

.Btn--primary
  border: 1px solid #00aeef
  color: #00aeef
  &:hover
    background: #00aeef
    color: #fff

.view
  transition: opacity .5s ease-in-out
  flex: 1
  min-height: 100vh

.fade-enter-active
  transition: opacity 0.5s

.fade-leave-active
  @extend .fade-enter-active

.fade-enter
  opacity: 0

.fade-leave
  @extend .fade-enter

.spinner
  background: #fff
  height: 2px
  box-shadow: 0px 1px 3px #ccc

@media only screen and (max-width: 640px)

  .ColumnHalf
    width: 100%

@media all and (min-width: 600px)

  .global-column-padding
    padding: 1em

  .ColumnSeventy
    width: 75%
    @extend .global-column-padding

  .ColumnHalf
    width: 50%
    @extend .global-column-padding

  .ColumnThird
    width: 33.33%
    @extend .global-column-padding

  .ColumnQuarter
    width: 25%
    @extend .global-column-padding


</style>
