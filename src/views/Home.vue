<template>
  <v-container>
    <template v-if="profileData">
      <div class="text-h4 mb-3">Go!!!</div>
      <div class="text-subtitle mb-10">
        Select the reason you want to get out of your home!
      </div>
      <div v-for="reason in reasons" :key="reason.smsNumber" class="my-5">
        <v-btn
          color="primary"
          class="mb-2"
          @click="checkSmsPermissions(reason.smsNumber)"
        >
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
    <v-snackbar v-model="snackbar.status">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbar.color"
          text
          v-bind="attrs"
          @click="snackbar.status = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { Plugins } from '@capacitor/core';
import { SMS } from '@ionic-native/sms';
const { Storage } = Plugins;

export default {
  name: 'Home',
  data: () => ({
    profileData: null,
    snackbar: {
      status: false,
      text: '',
      color: 'green',
    },
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
    this.setProfileData();
  },
  methods: {
    async setProfileData() {
      const profile = await Storage.get({ key: 'profileData' });
      this.profileData = JSON.parse(profile.value);
    },
    async checkSmsPermissions(smsReason) {
      try {
        await SMS.hasPermission();
        this.sendSMS(smsReason);
      } catch (error) {
        this.requestSmsPermissions(smsReason);
      }
    },
    async requestSmsPermissions(smsReason) {
      try {
        await SMS.requestPermission();
        await this.sendSMS(smsReason);
      } catch (error) {
        this.snackbar = {
          status: true,
          text: `You don't have the required permissions to send an SMS`,
          color: 'red',
        };
      }
    },
    async sendSMS(smsReason) {
      const { id, zipCode } = this.profileData;
      const number = '8998';
      const message = `${smsReason} ${id} ${zipCode}`;
      const options = {
        android: {
          // intent: 'INTENT',
          intent: '',
        },
      };
      try {
        await SMS.send(number, message, options);
        this.snackbar = {
          status: true,
          text: 'Your SMS has been sent successfully!',
          color: 'green',
        };
      } catch (error) {
        this.snackbar = {
          status: true,
          text: error,
          color: 'red',
        };
      }
    },
  },
};
</script>
