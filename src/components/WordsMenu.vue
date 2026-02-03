<template>
    <div class="words_panel_menu">
        <div class="menu_title">
            Menu
        </div>
        <div class="menu">
            <div class="words_menu_item"><router-link :to="{name: 'categories'}">Categories</router-link></div>
            <div class="words_menu_item"><router-link :to="{name: 'learn_words'}">Learn words</router-link></div>
            <div class="words_menu_item"><router-link :to="{name: 'repeat_words'}">Repeat words</router-link></div>
            <!-- <div class="words_menu_item">Mixed mode</div> -->
            <div class="words_menu_item"><router-link :to="{name: 'words_stats'}">Statistics</router-link></div>
        </div>
    </div>
</template>


<script setup>

</script>


<style scoped>
.words_panel_menu {
    display: inline-block;
    padding: 1em;

    border-bottom: 2px black solid;
    border-top: 2px black solid;
    border-right: 2px black solid;

    border-bottom-right-radius: 1.5em;
    border-top-right-radius: 1.5em;
    border-color: white;
    color: white;
    background-color: dodgerblue;

}

.menu_title {
    font-size: 1.5em;
    border-bottom: 2px white solid;
    padding-bottom: 0.5em;
}

.menu {
    padding: 0.5em 0;
    font-size: 1.5em;
}

.words_menu_item {
    padding: 0.2em;
    margin: 0.2em 0;
    color: white;
}
</style>