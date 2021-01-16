<template>
  <v-container>
    <template v-if="profileData">
      <div class="text-h4 mb-3">
        Permission Request
      </div>
      <div class="text-subtitle mb-10">
        Select the reason you want to get out of your home!
        <span class="primary--text" @click="showMoreInfoDialog = true">
          More Info
        </span>
      </div>
      <div class="buttons__wrapper">
        <div
          v-for="button in reasons"
          :key="button.smsNumber"
          class="button__container primary"
        >
          <v-icon color="accent" size="1.4em" class="mb-1">
            {{ button.icon }}
          </v-icon>
          <div class="button__label">
            {{ button.label }}
          </div>
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
    <v-dialog
      v-model="showMoreInfoDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <MoreInfo :reasons="reasons" @close="showMoreInfoDialog = false" />
    </v-dialog>
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
import MoreInfo from '@/components/home/MoreInfo.vue';

export default {
  name: 'Home',
  components: { MoreInfo },
  data: () => ({
    profileData: null,
    showMoreInfoDialog: false,
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
        description: `Going to a pharmacy, visiting a physician or for blood donation or laboratory testing
          for Covid-19 or for vaccination at the vaccination centres.`,
      },
      {
        smsNumber: 2,
        label: 'Shopping',
        icon: mdiBasketOutline,
        description: `Going to a shop for essential goods/services, including take away.`,
      },
      {
        smsNumber: 3,
        label: 'Bank',
        icon: mdiCurrencyEur,
        description: 'Going to the bank for transactions not available online.',
      },
      {
        smsNumber: 4,
        label: 'Government',
        icon: mdiBankOutline,
        description: `Strictly necessary visits to public services or services of the wider public sector and local
          authorities.`,
      },
      {
        smsNumber: 5,
        label: 'Help people',
        icon: mdiHandshakeOutline,
        description: `Helping people who cannot take care of themselves or people who must protect 
          themselves or who are in self-isolation and/or in places of compulsory isolation (quarantine).`,
      },
      {
        smsNumber: 6,
        label: 'Exercise',
        icon: mdiRun,
        description:
          'Physical activity or individual sports practiced in areas were access is permitted.',
      },
      {
        smsNumber: 7,
        label: 'Ceremonies',
        icon: mdiStarOutline,
        description: `Going to a ceremony (e.g. funeral, wedding, christening) of first and 
          second degree relatives not exceeding 10 people or for individual prayer`,
      },
      {
        smsNumber: 8,
        label: 'Other',
        icon: mdiHelpCircleOutline,
        description: `Any other reason that may be justified under the lockdown measures (by presenting the
          necessary proof for each case)`,
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
    border-radius: 0.5em;
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
