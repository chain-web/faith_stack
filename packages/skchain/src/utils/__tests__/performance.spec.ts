import { bytes } from 'multiformats';
import {
  logClassPerformance,
  logPerformance,
  performanceCollecter,
} from '../performance.js';

@logClassPerformance()
class testClass {
  str = '';

  init() {
    while (this.str.length <= 100000) {
      this.str += Math.random().toFixed(5);
    }
  }
  @logPerformance
  toBytes() {
    return bytes.fromString(this.str);
  }
}

describe('logPerformance', () => {
  describe('test', () => {
    it('should logPerformance ok', async () => {
      const tc = new testClass();
      tc.init();
      expect(tc.str.length).toBeGreaterThan(100000);
      const _bts = tc.toBytes();
      const toBytesLog = performanceCollecter.logs.find(
        (log) => log.funcName === 'toBytes',
      );
      if (!toBytesLog) {
        throw new Error('no toBytesLog');
      }
      expect(toBytesLog.stack.pop()).toEqual('toBytes');
      expect(toBytesLog.stack.pop()).toEqual('testClass');
    });
  });
});
