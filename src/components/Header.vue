<script setup>
    import { RouterLink } from "vue-router";
</script>
<template>
    <div>
        <ui>
            <p>Прогноз</p>
            <li>
              <RouterLink active-class="active" class="text" to="/"
                >По часам</RouterLink
              >
            </li>
            <li>
              <RouterLink active-class="active" class="text" to="/dayli-map"
                >По дням</RouterLink
              >
            </li>
        </ui>
    </div>
</template>
<style scoped>
    .text{
        text-decoration: none;
        color: #acacac;
    }
    p{
        padding: 0;
        margin: 0;
        color: #fff;
    }
    .active{
        color: #fff;
        border-bottom: 1px solid #fff;
    }
    ui{
        margin: 20px;
        font-size: 25px;
        display: flex;
        flex-direction: row;
    }
</style>