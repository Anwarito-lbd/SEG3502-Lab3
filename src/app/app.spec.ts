import { describe, it, expect, beforeEach } from 'vitest';
import { App } from './app';

describe('App Component', () => {
  let app: App;

  beforeEach(() => {
    app = new App();
  });

  it('should initialize with shopping tab as default', () => {
    expect(app.activeTab).toBe('shopping');
  });

  it('should switch tabs properly', () => {
    app.setTab('address');
    expect(app.activeTab).toBe('address');

    app.setTab('shopping');
    expect(app.activeTab).toBe('shopping');
  });
});
