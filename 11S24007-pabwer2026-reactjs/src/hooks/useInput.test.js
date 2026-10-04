import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import useInput from "./useInput";

describe("useInput", () => {
  it("should use the initial value", () => {
    const { result } = renderHook(() => useInput("Jannah"));

    expect(result.current.value).toBe("Jannah");
  });

  it("should use empty string as default value", () => {
    const { result } = renderHook(() => useInput());

    expect(result.current.value).toBe("");
  });

  it("should change value when onChange is called", () => {
    const { result } = renderHook(() => useInput(""));

    act(() => {
      result.current.onChange({
        target: {
          value: "Miftahul Jannah Siregar",
        },
      });
    });

    expect(result.current.value).toBe("Miftahul Jannah Siregar");
  });

  it("should change value using setValue", () => {
    const { result } = renderHook(() => useInput(""));

    act(() => {
      result.current.setValue("11S24007");
    });

    expect(result.current.value).toBe("11S24007");
  });

  it("should reset value to the initial value", () => {
    const { result } = renderHook(() => useInput("Initial"));

    act(() => {
      result.current.setValue("Changed");
    });

    expect(result.current.value).toBe("Changed");

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe("Initial");
  });
});