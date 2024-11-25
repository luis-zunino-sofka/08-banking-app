import React, { ReactNode } from "react";
import {
  AccountContext,
  IAccountContext,
} from "../../../../src/app/core/state/context";
import { describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppContext } from "../../../../src/app/core/state/AppContext";
import { IState } from "../../../../src/app/core/interfaces";
import { mockAppState, mockAccountState } from "../../../mocks/dataMocked";

interface IProps {
  children: ReactNode;
  mockAppState: IState;
  mockAccountState: IAccountContext;
}
export const appWrapper = ({
  children,
  mockAppState,
  mockAccountState,
}: IProps) => (
  <AppContext.Provider value={mockAppState}>
    <AccountContext.Provider value={mockAccountState}>
      {children}
    </AccountContext.Provider>
  </AppContext.Provider>
);

export const AccountContextMock = ({
  children,
  mockAppState,
  mockAccountState,
}: IProps) => appWrapper({ children, mockAppState, mockAccountState });

vi.mock("../../../../src/app/core/state/AppContext");
describe("AccountProvider", () => {
  test("Match snapshoot", () => {
    const { asFragment } = render(
      <AppContext.Provider value={mockAppState}>
        <AccountContext.Provider value={mockAccountState}>
          <></>
        </AccountContext.Provider>
      </AppContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
