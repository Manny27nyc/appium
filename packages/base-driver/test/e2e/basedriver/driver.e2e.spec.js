// transpile:mocha

import BaseDriver from '../../../lib';
import {baseDriverE2ETests} from '@appium/test-support';
baseDriverE2ETests(BaseDriver, {
  platformName: 'iOS',
  'appium:deviceName': 'Delorean',
});
