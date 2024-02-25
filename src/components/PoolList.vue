<template>
  <div class="poll-list">
    <div class="poll-list__header">
      <h1>Previous Rulings</h1>
   <b-dropdown size="lg" variant="light" :text="viewType" class="m-md-2 custom-dropdown">
        <b-dropdown-item v-for="type in types" :key="type.value" @click="viewType = type.value">
          {{ type.text }}
        </b-dropdown-item>
      </b-dropdown>
    </div>yarn add bootstrap-vue bootstrap

  </div>
</template>

<script>
export default {
  name: 'PoolList',
  data() {
    return {
      viewType: 'list',
      types: [
        { text: 'Grid', value: 'grid' },
        { text: 'List', value: 'list' },
      ], 
     
    };
  },
 
};
</script>

<style scoped lang="scss">
.poll-list {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    &.list {
      // list view styles
    }
    &.grid {
      // grid view styles
    }
  }
}



.custom-dropdown {
    width: 200px;
    border: 2px solid #000;
    border-radius: 0;
    ul.dropdown-menu.show {
      left: -2px;
    }
    li  {
      border: 1px solid #000;
      border-radius: 0;
      width: 200px;
      margin-top: -10px;
      margin-bottom: 10px;
      height: 50px;
      &:last-child {
        margin-bottom: -10px;
      }
    
    }
    .dropdown-menu.show {
      background: unset;
      padding: 0 !important;
    }
}
</style>