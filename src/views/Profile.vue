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
    <v-btn :disabled="!isFormDataChanged" color="primary" @click="save">
      Save
    </v-btn>
  </v-container>
</template>

<script>
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export default {
  name: 'Profile',
  data: () => ({
    initialForm: {
      id: '',
      zipCode: '',
    },
    form: {
      id: '',
      zipCode: '',
    },
  }),
  computed: {
    isFormDataChanged() {
      const isIdChanged = this.initialForm.id !== this.form.id;
      const isZipCodeChanged = this.initialForm.zipCode !== this.form.zipCode;
      return isIdChanged || isZipCodeChanged;
    },
  },
  created() {
    this.initializeFormData();
  },
  methods: {
    async initializeFormData() {
      const profileData = await Storage.get({ key: 'profileData' });
      if (profileData.value) {
        this.initialForm = JSON.parse(profileData.value);
        this.form = JSON.parse(profileData.value);
      }
    },
    async save() {
      await Storage.set({
        key: 'profileData',
        value: JSON.stringify({ ...this.form }),
      });
      this.initializeFormData();
    },
  },
};
</script>
