import { RegularOperationModule } from './regular-operation.module';

describe('RegularOperationModule', () => {
  let regularOperationModule: RegularOperationModule;

  beforeEach(() => {
    regularOperationModule = new RegularOperationModule();
  });

  it('should create an instance', () => {
    expect(regularOperationModule).toBeTruthy();
  });
});
