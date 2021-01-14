<template>
  <v-container>
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
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
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
  methods: {
    sendSMS(number) {
      console.log('send sms', number);
    },
  },
};
</script>
