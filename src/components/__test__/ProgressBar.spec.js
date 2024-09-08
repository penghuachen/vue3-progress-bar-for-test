import { mount } from '@vue/test-utils'
import { vi, test, afterEach, beforeEach, describe, expect } from 'vitest';
import App from '@/App.vue'

describe('ProgressBar 元件測試', () => {
  let wrapper;

  beforeEach(() => {
    vi.useFakeTimers(); // 使用假計時器
    wrapper = mount(App);
  });

  afterEach(() => {
    vi.useRealTimers(); // 恢復真實計時器
  });

  const startProgress = async () => {
    const startProgressBtn = wrapper.find('.start-progress-btn');
    await startProgressBtn.trigger('click');
  };

  test('在 2 秒後，progressValue 要更新至 20', async () => {
    await startProgress();

    await vi.advanceTimersByTimeAsync(2000);

    expect(wrapper.vm.progressValue).toBe(20);
  });

  test('無限模式下，進度達到 100 時應重置為 0', async () => {
    await startProgress();

    await vi.advanceTimersByTimeAsync(11000);

    expect(wrapper.vm.progressValue).toBe(0);
  });

  test('能夠重置進度條', async () => {
    await startProgress();

    await vi.advanceTimersByTimeAsync(5000);
    expect(wrapper.vm.progressValue).toBe(50);

    const resetProgressBtn = wrapper.find('.reset-progress-btn');
    await resetProgressBtn.trigger('click');
    expect(wrapper.vm.progressValue).toBe(0);
  });

  test('應該在停止後保持進度不變', async () => {
    await startProgress();

    await vi.advanceTimersByTimeAsync(5000);
    expect(wrapper.vm.progressValue).toBe(50);

    const stopProgressBtn = wrapper.find('.stop-progress-btn');
    await stopProgressBtn.trigger('click');

    await vi.advanceTimersByTimeAsync(1000);
    expect(wrapper.vm.progressValue).toBe(50);
  });

  test('在進度條啟動後，再次點擊啟動按鈕應該無效', async () => {
    await startProgress();
    await startProgress();

    await vi.advanceTimersByTimeAsync(2000);
    expect(wrapper.vm.progressValue).toBe(20);
  })
});
