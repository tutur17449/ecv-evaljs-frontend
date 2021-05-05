<template>
  <div>
    <b-alert show variant="danger">
      {{ message }}
    </b-alert>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: ["message"],
};
</script>
 