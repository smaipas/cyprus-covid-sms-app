<template>
  <v-container>
    <template v-if="profileData">
      <div class="text-h4 mb-3">
        Permission Request
      </div>
      <div class="text-subtitle mb-10">
        Select the reason you want to get out of your home!
      </div>
      <div class="buttons__wrapper">
        <div
          v-for="button in reasons"
          :key="button.smsNumber"
          class="button__container light-blue darken-1"
        >
          <v-icon color="white" size="1.4em" class="mb-1">
            {{ button.icon }}
          </v-icon>
          <div class="button__label">{{ button.label }}</div>
          <!-- <v-btn
          color="primary"
          class="mb-2"
          @click="checkSmsPermissions(reason.smsNumber)"
        >
          ({{ reason.smsNumber }}) {{ reason.label }}
        </v-btn>
        <div class="caption">{{ reason.description }}</div> -->
        </div>
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
import {
  mdiHospitalBoxOutline,
  mdiBasketOutline,
  mdiCurrencyEur,
  mdiBankOutline,
  mdiHandshakeOutline,
  mdiRun,
  mdiStarOutline,
  mdiHelpCircleOutline,
} from '@mdi/js';

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
        label: 'Pharmacy / Doctor',
        icon: mdiHospitalBoxOutline,
        description:
          'Pharmacy or blood donation or doctor visit or Covid test or vaccination',
      },
      {
        smsNumber: 2,
        label: 'Shopping',
        icon: mdiBasketOutline,
        description: 'Shopping for supplies/services, including take away',
      },
      {
        smsNumber: 3,
        label: 'Bank',
        icon: mdiCurrencyEur,
        description: 'Bank, if an online transaction is not possible',
      },
      {
        smsNumber: 4,
        label: 'Government',
        icon: mdiBankOutline,
        description:
          'Absolutely necessary visit to government departments or departments of the wider public sector or local administration',
      },
      {
        smsNumber: 5,
        label: 'Help people',
        icon: mdiHandshakeOutline,
        description:
          'To help people who cannot look after themselves or cannot protect themselves or are in isolation at home or designated quarantine premises',
      },
      {
        smsNumber: 6,
        label: 'Exercise',
        icon: mdiRun,
        description:
          'Physical exercise or individual training provided access is allowed at the venue',
      },
      {
        smsNumber: 7,
        label: 'Ceremonies',
        icon: mdiStarOutline,
        description:
          'To attend a funeral, wedding, christening, by first and second degree relatives who do not exceed 10 or for individual prayer',
      },
      {
        smsNumber: 8,
        label: 'Other',
        icon: mdiHelpCircleOutline,
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

<style lang="scss" scoped>
.buttons__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7em, 1fr));
  gap: 1em;
}
.button {
  &__container {
    color: white;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__label {
    font-size: 0.9em;
  }
}
</style>
