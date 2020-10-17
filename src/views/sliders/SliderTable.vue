<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CIcon name="cil-grid"/> {{caption}}
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :border="border"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :items-per-page="small ? 10 : 5"
        :dark="dark"
        pagination
      >
        <template #image="{item}">
          <td>
            <CImg :src="item.image" height="50px" />
          </td>
        </template>
        <template #action="{item}">
          <td>
            <CLink block color="link" class="text-left" :to="{name: 'SliderDetail', params: { id: item.key }}">Details</CLink>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
  export default {
    name: 'SliderTable',
    props: {
      items: Array,
      fields: {
        type: Array,
        default () {
          return ['username', 'registered', 'role', 'status']
        }
      },
      caption: {
        type: String,
        default: 'Table'
      },
      hover: Boolean,
      striped: Boolean,
      border: Boolean,
      small: Boolean,
      fixed: Boolean,
      dark: Boolean
    },
    methods: {
      getBadge (status) {
        return status === 'Active' ? 'success'
          : status === 'Inactive' ? 'secondary'
            : status === 'Pending' ? 'warning'
              : status === 'Banned' ? 'danger' : 'primary'
      }
    }
  }
</script>
