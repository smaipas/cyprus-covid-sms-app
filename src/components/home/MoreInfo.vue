<template>
  <v-card>
    <v-card-text>
      <div
        class="pt-2 font-weight-black secondary--text d-flex justify-space-between align-center"
      >
        INSTRUCTIONS FOR CITIZENS
        <v-btn color="primary" icon @click="$emit('close')">
          <v-icon>{{ closeIcon }}</v-icon>
        </v-btn>
      </div>
      <div class="font-weight-black primary--text mt-3">BAN ON MOVEMENTS</div>
      <div class="font-weight-bold secondary--text">Curfew Hours</div>
      <div>
        Movement is prohibited from 21:00 p.m. to 5:00 a.m. of the next day.
      </div>
      <div class="font-weight-bold secondary--text mt-2">Exemptions</div>
      <div>
        Movement during curfew hours is permitted for the following reasons:
        <ol>
          <li>
            going to and coming back from work, with the presentation of Form A,
            filled in and signed by the employer.
          </li>
          <li>
            for imperative urgency, i.e. going to a medical centre or hospital
            or pharmacy or veterinarian for medical emergencies or to provide
            urgent assistance to people who are unable to take care of
            themselves or who must protect themselves.
          </li>
        </ol>
      </div>
      <div class="font-weight-black primary--text mt-5">
        CITIZEN’S MOVEMENT BY EXCEPTION
      </div>
      <div class="font-weight-bold secondary--text">Number of Movements</div>
      <div>The movement by exception shall be permitted twice a day.</div>
      <div class="font-weight-bold secondary--text mt-2">
        Reasons of movement
      </div>
      <div>
        <div v-for="reason in reasons" :key="reason.smsNumber">
          <span class="font-weight-medium secondary--text">
            {{ reason.smsNumber }}. {{ reason.label }}
          </span>
          - {{ reason.description }}
        </div>
      </div>
      <div class="red--text mt-3">
        Please make sure to visit government's website to get updated for the
        latest updates.
      </div>
      <div class="text-center mt-4">
        <v-btn color="primary" @click="$emit('close')">Close</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiClose } from '@mdi/js';
export default {
  name: 'MoreInfo',
  props: {
    reasons: { type: Array, required: true },
  },
  data: () => ({
    closeIcon: mdiClose,
  }),
};
</script>

<style lang="scss" scoped></style>
