<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/employees/${route.params.id}`)
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

        <div class="flex flex-col gap-10 my-10">
          <div class="flex flex-col gap-6">
            <div class="flex items-center gap-4">
              <UAvatar :src="data?.employee?.profilePicture" size="3xl" alt="Avatar" />
              <div class="flex flex-col gap-2">
                <p class="text-xl text-primary font-semibold">{{ data?.employee?.name }}</p>
                <div class="flex gap-2">
                  <UBadge variant="soft">{{ data?.employee?.jobArea }}</UBadge>
                  <UBadge variant="soft">{{ data?.employee?.jobType }}</UBadge>
                  <UBadge variant="soft">{{ data?.employee?.jobTitle }}</UBadge>
                </div>
              </div>
            </div>
            <div class="flex flex-col px-2">
              <p class="text-primary-100">{{ data?.employee?.bio }}</p>
            </div>
          </div>
        </div>
    </UCard>
  </UContainer>
</template>