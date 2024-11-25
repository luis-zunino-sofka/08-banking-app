import { renderHook } from "@testing-library/react";
import { describe, expectTypeOf, test } from "vitest";
import { useNavbar } from "../../../../src/app/core/hooks/navbar/useNavbar";

describe("useNavigate hook", () => {
  test("los tipos de cada elemento del array deben ser correctos", () => {
    const { result } = renderHook(() => useNavbar());
    const {
      current: { navItems },
    } = result;

    expectTypeOf(result.current.navItems).toBeArray();

    navItems.forEach((item) => {
      expectTypeOf(item).toBeObject();
      expectTypeOf(item.label).toBeString();
      expectTypeOf(item.onClick).toBeFunction();
      expectTypeOf(item.isActive).toBeBoolean();
    });

    expectTypeOf(result.current.handleLogout).toBeFunction();
  });
});
