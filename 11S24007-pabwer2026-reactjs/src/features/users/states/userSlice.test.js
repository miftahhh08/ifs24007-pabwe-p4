import { describe, expect, it } from "vitest";

import reducer, {
  initialState,
  isUserGet,
  isUserGetCurrent,
  isUserUpdate,
  isUserUpdatePhoto,
  isUserUpdatePassword,
} from "./userSlice";

describe("userSlice", () => {
  it("mengembalikan initialState", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("isUserGet", () => {
    it("menyimpan users dari payload.data.users", () => {
      const users = [{ id: 1, name: "Jannah" }];

      const state = reducer(
        initialState,
        isUserGet({
          data: {
            users,
          },
        })
      );

      expect(state.isUserGet).toBe(true);
      expect(state.error).toBeNull();
      expect(state.users).toEqual(users);
    });

    it("menyimpan users dari payload.users", () => {
      const users = [{ id: 2, name: "Eliza" }];

      const state = reducer(
        initialState,
        isUserGet({
          users,
        })
      );

      expect(state.users).toEqual(users);
    });

    it("menggunakan array kosong jika users tidak tersedia", () => {
      const state = reducer(initialState, isUserGet({}));

      expect(state.users).toEqual([]);
    });
  });

  describe("isUserGetCurrent", () => {
    it("menyimpan user dari payload.data.user", () => {
      const user = {
        id: 1,
        name: "Miftahul Jannah Siregar",
      };

      const state = reducer(
        initialState,
        isUserGetCurrent({
          data: {
            user,
          },
        })
      );

      expect(state.isUserGetCurrent).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(user);
    });

    it("menyimpan user dari payload.user", () => {
      const user = {
        id: 2,
        name: "User Test",
      };

      const state = reducer(
        initialState,
        isUserGetCurrent({
          user,
        })
      );

      expect(state.user).toEqual(user);
    });

    it("tidak mengubah user jika user tidak tersedia", () => {
      const existingUser = {
        id: 3,
        name: "Existing User",
      };

      const stateWithUser = {
        ...initialState,
        user: existingUser,
      };

      const state = reducer(
        stateWithUser,
        isUserGetCurrent({})
      );

      expect(state.isUserGetCurrent).toBe(true);
      expect(state.user).toEqual(existingUser);
    });
  });

  describe("isUserUpdate", () => {
    it("mengubah user dari payload.data.user", () => {
      const user = {
        id: 1,
        name: "Updated User",
      };

      const state = reducer(
        initialState,
        isUserUpdate({
          data: {
            user,
          },
        })
      );

      expect(state.isUserUpdate).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(user);
    });

    it("mengubah user dari payload.user", () => {
      const user = {
        id: 2,
        name: "Updated User 2",
      };

      const state = reducer(
        initialState,
        isUserUpdate({
          user,
        })
      );

      expect(state.user).toEqual(user);
    });

    it("tidak mengubah user jika user tidak tersedia", () => {
      const existingUser = {
        id: 3,
        name: "Existing User",
      };

      const state = reducer(
        {
          ...initialState,
          user: existingUser,
        },
        isUserUpdate({})
      );

      expect(state.isUserUpdate).toBe(true);
      expect(state.user).toEqual(existingUser);
    });
  });

  describe("isUserUpdatePhoto", () => {
    it("mengubah user dari payload.data.user", () => {
      const user = {
        id: 1,
        name: "Photo User",
        photo: "photo.jpg",
      };

      const state = reducer(
        initialState,
        isUserUpdatePhoto({
          data: {
            user,
          },
        })
      );

      expect(state.isUserUpdatePhoto).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(user);
    });

    it("mengubah user dari payload.user", () => {
      const user = {
        id: 2,
        name: "Photo User 2",
        photo: "photo2.jpg",
      };

      const state = reducer(
        initialState,
        isUserUpdatePhoto({
          user,
        })
      );

      expect(state.user).toEqual(user);
    });

    it("tidak mengubah user jika user tidak tersedia", () => {
      const existingUser = {
        id: 3,
        name: "Existing User",
      };

      const state = reducer(
        {
          ...initialState,
          user: existingUser,
        },
        isUserUpdatePhoto({})
      );

      expect(state.isUserUpdatePhoto).toBe(true);
      expect(state.user).toEqual(existingUser);
    });
  });

  describe("isUserUpdatePassword", () => {
    it("menandai update password berhasil", () => {
      const state = reducer(
        initialState,
        isUserUpdatePassword()
      );

      expect(state.isUserUpdatePassword).toBe(true);
      expect(state.error).toBeNull();
    });
  });
});