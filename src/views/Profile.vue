<template>
  <v-container>
    <div class="text-h4 mb-3">Your Profile Info</div>
    <div class="text-subtitle mb-10">
      Cypriot citizens should use their ID card number, while European citizens
      and third-country nationals their Alien Registration Number (ARC) or their
      registration certificate or residence permit; foreign passport or identity
      card number, diplomatic passport number.
    </div>
    <v-text-field v-model="form.id" label="ID/ARC Number" filled></v-text-field>
    <v-text-field v-model="form.zipCode" label="Zip Code" filled></v-text-field>
    <v-btn color="primary" @click="save">Save</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Profile',
  data: () => ({
    form: {
      id: '',
      zipCode: '',
    },
  }),
  methods: {
    save() {
      console.log(this.form);
    },
  },
};
</script>
