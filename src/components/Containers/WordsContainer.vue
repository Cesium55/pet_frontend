<template>
        <div class="words-container">
            <div class="left_side">
                <div class="menu_cont">
                    <WordsMenu></WordsMenu>
                </div>
            </div>

            <div class="right_side">
                <slot></slot>
            </div>
        </div>

</template>


<script setup>
import WordsMenu from '../WordsMenu.vue';
</script>


<style scoped>
.words-container {
    display: flex;
    gap: 2em;
    height: 100%;
}

.left_side {
    width: 15em;
    flex-shrink: 0;
}
.right_side{
    flex: 1;
    min-height: 100%;
}

.menu_cont {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}
</style>