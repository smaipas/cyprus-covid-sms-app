<template>
  <v-container>
    <template v-if="profileData">
      <div class="text-h4 mb-3">Go!!!</div>
      <div class="text-subtitle mb-10">
        Select the reason you want to get out of your home!
      </div>
      <div v-for="reason in reasons" :key="reason.smsNumber" class="my-5">
        <v-btn color="primary" class="mb-2" @click="sendSMS(reason.smsNumber)">
          ({{ reason.smsNumber }}) {{ reason.label }}
        </v-btn>
        <div class="caption">{{ reason.description }}</div>
      </div>
    </template>
    <template v-else>
      <div class="text-h4 mb-3">Setup your profile</div>
      <div class="text-subtitle mb-10">
        Please go to profile page to setup your account.
      </div>
      <div class="text-center">
        <v-btn color="primary" @click="$router.push({ name: 'Profile' })">
          Go To Profile
        </v-btn>
      </div>
    </template>
  </v-container>
</template>

<script>
import { registerWebPlugin, Plugins } from '@capacitor/core';
import { SmsManager } from '@byteowls/capacitor-sms';
const { Storage } = Plugins;

export default {
  name: 'Home',
  data: () => ({
    profileData: null,
    reasons: [
      {
        smsNumber: 1,
        label: 'Pharmacy',
        description:
          'Pharmacy or blood donation or doctor visit or Covid test or vaccination',
      },
      {
        smsNumber: 2,
        label: 'Shopping',
        description: 'Shopping for supplies/services, including take away',
      },
      {
        smsNumber: 3,
        label: 'Bank',
        description: 'Bank, if an online transaction is not possible',
      },
      {
        smsNumber: 4,
        label: 'Government',
        description:
          'Absolutely necessary visit to government departments or departments of the wider public sector or local administration',
      },
      {
        smsNumber: 5,
        label: 'Help people',
        description:
          'To help people who cannot look after themselves or cannot protect themselves or are in isolation at home or designated quarantine premises',
      },
      {
        smsNumber: 6,
        label: 'Exercise',
        description:
          'Physical exercise or individual training provided access is allowed at the venue',
      },
      {
        smsNumber: 7,
        label: 'Events',
        description:
          'To attend a funeral, wedding, christening, by first and second degree relatives who do not exceed 10 or for individual prayer',
      },
      {
        smsNumber: 8,
        label: 'Other',
        description:
          'Any other reason that can be justified on the basis of the restrictions',
      },
    ],
  }),
  created() {
    registerWebPlugin(SmsManager);
    this.setProfileData();
  },
  methods: {
    async setProfileData() {
      const profile = await Storage.get({ key: 'profileData' });
      this.profileData = JSON.parse(profile.value);
    },
    async sendSMS(option) {
      if (!this.profileData) return; // handle error!
      const { id, zipCode } = this.profileData;
      const number = '8998';
      await Plugins.SmsManager.send({
        numbers: [number],
        text: `${option} ${id} ${zipCode}`,
      });
      console.log('sms has been sent', option);
    },
  },
};
</script>
