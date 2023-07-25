<script setup>
    import { RouterLink } from "vue-router";
</script>
<template>
    <div>
        <ui>
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