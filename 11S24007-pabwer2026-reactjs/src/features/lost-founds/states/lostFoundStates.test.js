import { describe, expect, it } from "vitest";

import {
  isLostFound,
  isLostFoundDetail,
  isLostFoundAdd,
  isLostFoundChange,
  isLostFoundChangeCover,
  isLostFoundDelete,
  isLostFoundStats,
} from "./lostFoundActions";

import reducer, {
  initialState,
} from "./lostFoundSlice";

describe("lostFoundActions", () => {
  it("isLostFound membuat action yang benar", () => {
    const payload = {
      data: {
        lost_founds: [],
      },
    };

    expect(isLostFound(payload)).toEqual({
      type: "lostFounds/isLostFound",
      payload,
    });
  });

  it("isLostFoundDetail membuat action yang benar", () => {
    const payload = {
      data: {
        lost_found: {
          id: 1,
        },
      },
    };

    expect(isLostFoundDetail(payload)).toEqual({
      type: "lostFounds/isLostFoundDetail",
      payload,
    });
  });

  it("isLostFoundAdd membuat action yang benar", () => {
    const payload = {
      data: {
        id: 1,
      },
    };

    expect(isLostFoundAdd(payload)).toEqual({
      type: "lostFounds/isLostFoundAdd",
      payload,
    });
  });

  it("isLostFoundChange membuat action yang benar", () => {
    const payload = {
      data: {
        lost_found: {
          id: 1,
        },
      },
    };

    expect(isLostFoundChange(payload)).toEqual({
      type: "lostFounds/isLostFoundChange",
      payload,
    });
  });

  it("isLostFoundChangeCover membuat action yang benar", () => {
    const payload = {
      data: {
        lost_found: {
          id: 1,
        },
      },
    };

    expect(isLostFoundChangeCover(payload)).toEqual({
      type: "lostFounds/isLostFoundChangeCover",
      payload,
    });
  });

  it("isLostFoundDelete membuat action yang benar", () => {
    const payload = {
      status: "success",
    };

    expect(isLostFoundDelete(payload)).toEqual({
      type: "lostFounds/isLostFoundDelete",
      payload,
    });
  });

  it("isLostFoundStats membuat action yang benar", () => {
    const payload = {
      data: {
        total: 10,
      },
    };

    expect(isLostFoundStats(payload)).toEqual({
      type: "lostFounds/isLostFoundStats",
      payload,
    });
  });
});

describe("lostFoundSlice", () => {
  it("menggunakan initialState yang benar", () => {
    const state = reducer(undefined, {
      type: "@@INIT",
    });

    expect(state).toEqual(initialState);
  });

  it("menyimpan daftar lost found dari data.lost_founds", () => {
    const payload = {
      data: {
        lost_founds: [
          {
            id: 1,
            title: "Dompet",
          },
        ],
      },
    };

    const state = reducer(
      initialState,
      isLostFound(payload)
    );

    expect(state.isLostFound).toBe(true);
    expect(state.error).toBeNull();
    expect(state.lostFounds).toEqual(
      payload.data.lost_founds
    );
  });

  it("menyimpan daftar lost found dari data.lostFounds", () => {
    const payload = {
      data: {
        lostFounds: [
          {
            id: 2,
            title: "Kunci",
          },
        ],
      },
    };

    const state = reducer(
      initialState,
      isLostFound(payload)
    );

    expect(state.lostFounds).toEqual(
      payload.data.lostFounds
    );
  });

  it("menyimpan daftar lost found dari lost_founds", () => {
    const payload = {
      lost_founds: [
        {
          id: 3,
          title: "Tas",
        },
      ],
    };

    const state = reducer(
      initialState,
      isLostFound(payload)
    );

    expect(state.lostFounds).toEqual(
      payload.lost_founds
    );
  });

  it("menggunakan array kosong jika daftar tidak tersedia", () => {
    const state = reducer(
      initialState,
      isLostFound({})
    );

    expect(state.lostFounds).toEqual([]);
  });

  it("menyimpan detail lost found", () => {
    const item = {
      id: 1,
      title: "Dompet",
    };

    const state = reducer(
      initialState,
      isLostFoundDetail({
        data: {
          lost_found: item,
        },
      })
    );

    expect(state.lostFound).toEqual(item);
    expect(state.error).toBeNull();
  });

  it("tidak mengubah detail jika data kosong", () => {
    const previousState = {
      ...initialState,
      lostFound: {
        id: 10,
        title: "Data lama",
      },
    };

    const state = reducer(
      previousState,
      isLostFoundDetail({})
    );

    expect(state.lostFound).toEqual(
      previousState.lostFound
    );
  });

  it("menandai laporan berhasil ditambahkan", () => {
    const state = reducer(
      initialState,
      isLostFoundAdd({})
    );

    expect(state.isLostFoundAdd).toBe(true);
    expect(state.isLostFoundAdded).toBe(true);
    expect(state.error).toBeNull();
  });

  it("menandai laporan berhasil diubah", () => {
    const item = {
      id: 1,
      title: "Dompet Baru",
    };

    const state = reducer(
      initialState,
      isLostFoundChange({
        data: {
          lost_found: item,
        },
      })
    );

    expect(state.isLostFoundChange).toBe(true);
    expect(state.isLostFoundChanged).toBe(true);
    expect(state.lostFound).toEqual(item);
    expect(state.error).toBeNull();
  });

  it("menandai cover berhasil diubah", () => {
    const item = {
      id: 1,
      title: "Dompet",
      cover: "cover.jpg",
    };

    const state = reducer(
      initialState,
      isLostFoundChangeCover({
        data: {
          lost_found: item,
        },
      })
    );

    expect(state.isLostFoundChangeCover).toBe(true);
    expect(state.isLostFoundChangedCover).toBe(true);
    expect(state.lostFound).toEqual(item);
    expect(state.error).toBeNull();
  });

  it("menandai laporan berhasil dihapus", () => {
    const state = reducer(
      initialState,
      isLostFoundDelete({})
    );

    expect(state.isLostFoundDelete).toBe(true);
    expect(state.isLostFoundDeleted).toBe(true);
    expect(state.error).toBeNull();
  });

  it("menyimpan statistik dari payload.data", () => {
    const statistics = {
      total: 10,
      lost: 5,
      found: 5,
    };

    const state = reducer(
      initialState,
      isLostFoundStats({
        data: statistics,
      })
    );

    expect(state.lostFoundStats).toEqual(
      statistics
    );
    expect(state.error).toBeNull();
  });

  it("menyimpan statistik langsung dari payload", () => {
    const statistics = {
      total: 20,
    };

    const state = reducer(
      initialState,
      isLostFoundStats(statistics)
    );

    expect(state.lostFoundStats).toEqual(
      statistics
    );
  });
});