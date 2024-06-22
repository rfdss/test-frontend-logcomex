<script setup lang="ts">
import { faker } from '@faker-js/faker'

const { data, error } = await useFetch('/api/employees')

const columns = [
  {
    label: 'ID',
    key: 'id',
    sortable: true
  },
  {
    label: 'Nome',
    key: 'name',
    sortable: true
  },
  {
    label: 'Área',
    key: 'jobArea',
    sortable: true
  },
  {
    label: 'Cargo',
    key: 'jobType',
    sortable: true
  },
  {
    label: 'Status',
    key: 'isActive',
    sortable: true
  },
  {
    key: 'actions',
  },
]

const jobAreaOptions = Array.from(new Set(data.value?.employees?.map(e => e.jobArea)))
  .map(opt => ({ id: opt.toLowerCase(), label: opt })) || []

const jobTypeOptions = Array.from(new Set(data.value?.employees?.map(e => e.jobType)))
  .map(opt => ({ id: opt.toLowerCase(), label: opt })) || []

const jobAreaFilterItems = [
  { id: null, label: 'Filtre por área' },
  ...new Set(jobAreaOptions)
]
const jobTypeFilterItems = [
  { id: null, label: 'Filtre por cargo' },
  ...new Set(jobTypeOptions),
]

const statusFilterItems = [
  { id: null, label: 'Todos' },
  { id: 1, label: 'Ativos' },
  { id: 0, label: 'Inativos' },
]

const searchQuery = ref('')
const jobAreaFilter = ref<{ id: string | null, label: string }>(jobAreaFilterItems[0])
const jobTypeFilter = ref<{ id: string | null, label: string }>(jobTypeFilterItems[0])
const statusFilter = ref<{ id: number | null, label: string }>(statusFilterItems[0])

const pageTotal = ref(data.value?.employees?.length)
const page = ref(1)
const pageCount = 10

const paginatedRows = computed(() => {
  return data.value?.employees?.slice(
    (page.value - 1) * pageCount, (page.value) * pageCount
  )
})

const filteredRows = computed(() => {
  if (
    !searchQuery.value &&
    !jobAreaFilter.value.id &&
    !jobTypeFilter.value.id &&
    statusFilter.value.id === null
  ) {
    return paginatedRows.value
  }

  let hasNoFilter = true
  let filtered = data.value?.employees

  if (searchQuery.value) {
    hasNoFilter = false
    filtered = filtered?.filter(e =>
      e.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      e.id.toString().includes(searchQuery.value)
    )
  }

  if (jobAreaFilter.value.id) {
    hasNoFilter = false
    filtered = filtered?.filter(e =>
      e.jobArea.toLowerCase().includes(jobAreaFilter.value?.label.toLowerCase())
    )
  }

  if (jobTypeFilter.value.id) {
    hasNoFilter = false
    filtered = filtered?.filter(e =>
      e.jobType.toLowerCase().includes(jobTypeFilter.value?.label.toLowerCase())
    )
  }

  if (statusFilter.value.id !== null) {
    hasNoFilter = false
    filtered = filtered?.filter(e =>
      e.isActive === Boolean(statusFilter.value.id)
    )
  }

  return !hasNoFilter ? filtered : paginatedRows.value
})
</script>

<template>
  <UContainer>
    <UCard class="my-10">
      <template #header>
        <div class="flex justify-between">
          <h1>Logcomex - Funcionários</h1>
          <ColorScheme>
            <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
          </ColorScheme>
        </div>
      </template>

      <div class="flex flex-col gap-10 my-4">
        <div class="flex max-sm:flex-col items-center gap-4">
          <UInput v-model="searchQuery" class="w-full md:w-1/3" size="lg" icon="i-heroicons-magnifying-glass-20-solid"
            autocomplete="off" placeholder="Pesquise por ID ou nome" />

          <USelectMenu searchable searchable-placeholder="Digite a área..." class="w-full md:w-1/4" v-slot="{ open }"
            v-model="jobAreaFilter" :options="jobAreaFilterItems">
            <UButton variant="ghost" color="gray" class="h-10 flex-1 justify-between border border-gray-700">
              {{ jobAreaFilter.label }}
              <UIcon name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500"
                :class="[open && 'transform rotate-90']" />
            </UButton>
          </USelectMenu>

          <USelectMenu searchable searchable-placeholder="Digite o cargo..." class="w-full md:w-1/4" v-slot="{ open }" v-model="jobTypeFilter" :options="jobTypeFilterItems">
            <UButton variant="ghost" color="gray" class="h-10 flex-1 justify-between border border-gray-700">
              {{ jobTypeFilter.label }}
              <UIcon name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500"
                :class="[open && 'transform rotate-90']" />
            </UButton>
          </USelectMenu>

          <USelectMenu class="w-full md:w-1/6" v-slot="{ open }" v-model="statusFilter" :options="statusFilterItems">
            <UButton variant="ghost" color="gray" class="h-10 flex-1 justify-between border border-gray-700">
              {{ statusFilter.label }}
              <UIcon name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500"
                :class="[open && 'transform rotate-90']" />
            </UButton>
          </USelectMenu>
        </div>
        <UTable :rows="filteredRows" :columns="columns">
          <template #isActive-data="{ row }">
            <UBadge :color="row.isActive ? 'green' : 'red'" variant="soft">{{ row.isActive ? 'ativo' : 'inativo' }}
            </UBadge>
          </template>

          <template #actions-data="{ row }">
            <UButton icon="i-heroicons-eye" size="sm" color="primary" variant="link" label="Ver" :trailing="false"
              :to="`/employees/${row.id}`" />
          </template>
        </UTable>
        <div class="flex justify-end px-3 py-3.5">
          <UPagination v-model="page" :page-count="pageCount" :total="pageTotal" />
        </div>
      </div>
    </UCard>
  </UContainer>
</template>