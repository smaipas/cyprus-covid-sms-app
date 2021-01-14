import { shallowMount } from '@vue/test-utils';
import BottomNav from '@/components/common/BottomNav.vue';

const mockRouter = {
  push: jest.fn(),
};

const mockRoute = {
  name: 'Home',
};

const generateWrapper = (options) => {
  return shallowMount(BottomNav, {
    mocks: {
      $route: mockRoute,
      $router: mockRouter,
    },
    ...options,
  });
};

describe('BottomNav.vue', () => {});
