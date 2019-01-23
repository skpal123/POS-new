import { AccountsDefinationModuleModule } from './accounts-defination-module.module';

describe('AccountsDefinationModuleModule', () => {
  let accountsDefinationModuleModule: AccountsDefinationModuleModule;

  beforeEach(() => {
    accountsDefinationModuleModule = new AccountsDefinationModuleModule();
  });

  it('should create an instance', () => {
    expect(accountsDefinationModuleModule).toBeTruthy();
  });
});
