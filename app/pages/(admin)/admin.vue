<template>
  <div class="p-3"></div>
  <div class="container p-3">
    <h1>Heyyy :3</h1>
  </div>
  <hr />
  <div class="container p-3" v-show="!loading">
    <div class="container p-3">
      <h3>Current links</h3>
      <div class="p-3"></div>
      <table class="table">
        <tbody>
          <tr>
            <th
              style="
                font-weight: normal !important;
                font-family: greycliff-bold;
              ">
              Link
            </th>
            <th
              style="
                font-weight: normal !important;
                font-family: greycliff-bold;
              ">
              Path
            </th>
            <th
              style="
                font-weight: normal !important;
                font-family: greycliff-bold;
              ">
              Destination
            </th>
            <th
              style="
                font-weight: normal !important;
                font-family: greycliff-bold;
              ">
              Created
            </th>
            <th
              style="
                font-weight: normal !important;
                font-family: greycliff-bold;
              ">
              Actions
            </th>
          </tr>
          <tr v-for="link in data">
            <td>
              <NuxtLink external :to="`/${link.code}`"
                >/{{ link.code }}</NuxtLink
              >
            </td>
            <td>/{{ link.code }}</td>
            <td>{{ link.link }}</td>
            <td>{{ new Date(link.created) }}</td>
            <td>
              <button class="btn btn-outline-danger" @click="remove(link.code)">
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="data.length === 0">
            <td>No links were found</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
    <div class="container p-3">
      <h3>Add a new link</h3>
      <div class="p-3"></div>
      <input
        v-model="link"
        type="url"
        placeholder="add url here"
        class="form-control" />
      <br />
      <button class="btn btn-outline-secondary" @click="submit">Submit</button>
    </div>
  </div>
  <div class="container p-3" v-show="loading">
    <h3>Your request is processing</h3>
  </div>
</template>

<script setup lang="ts">
const data = ref<Array<shortLink>>([]);
const link = ref<string>("");
const loading = ref<boolean>(false);

useFetch(`/api/manage/all`).then((e) => {
  if (e.status.value === "success") {
    data.value = e.data.value as any as shortLink[];
  }
});

async function submit() {
  if (link.value.length > 5 && link.value.startsWith("https://")) {
    loading.value = true;
    await refreshNuxtData("loading");

    let response = await useFetch("/api/manage/add", {
      method: "POST",
      body: { url: link.value },
    });

    if (response && response.status.value === "success") {
      data.value = response.data.value as any as shortLink[];
      loading.value = false;
      await refreshNuxtData(["loading", "data"]);
    } else {
      loading.value = false;
      await refreshNuxtData("loading");
    }
  }
}

async function remove(code: string) {
  if (true) {
    loading.value = true;
    await refreshNuxtData("loading");

    let response = await useFetch("/api/manage/delete", {
      method: "POST",
      body: { code: code },
    });

    if (response && response.status.value === "success") {
      data.value = response.data.value as any as shortLink[];
      loading.value = false;
      await refreshNuxtData(["loading", "data"]);
    } else {
      loading.value = false;
      await refreshNuxtData("loading");
    }
  }
}
</script>

<style lang="css" scoped>
td {
  overflow: scroll;
}

div {
  overflow: scroll;
}
</style>
