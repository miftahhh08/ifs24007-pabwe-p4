import reducer, {
  initialState,
  isLostFound,
  isLostFoundDetail,
  isLostFoundAdd,
  isLostFoundChange,
  isLostFoundChangeCover,
  isLostFoundDelete,
  isLostFoundStats,
} from "./lostFoundSlice";

describe("lostFoundSlice", () => {
  it("mengembalikan initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(
      initialState
    );
  });

  it("menyimpan daftar dari data.lost_founds", () => {
    const lostFounds = [{ id: 1, title: "Dompet" }];

    const state = reducer(
      initialState,
      isLostFound({
        data: {
          lost_founds: lostFounds,
        },
      })
    );

    expect(state.isLostFound).toBe(true);
    expect(state.lostFounds).toEqual(lostFounds);
    expect(state.error).toBeNull();
  });

  it("menyimpan daftar dari data.lostFounds", () => {
    const lostFounds = [{ id: 2, title: "Kunci" }];

    const state = reducer(
      initialState,
      isLostFound({
        data: {
          lostFounds,
        },
      })
    );

    expect(state.lostFounds).toEqual(lostFounds);
  });

  it("menyimpan daftar dari lost_founds", () => {
    const lostFounds = [{ id: 3, title: "Tas" }];

    const state = reducer(
      initialState,
      isLostFound({
        lost_founds: lostFounds,
      })
    );

    expect(state.lostFounds).toEqual(lostFounds);
  });

  it("menyimpan daftar dari lostFounds", () => {
    const lostFounds = [{ id: 4, title: "Laptop" }];

    const state = reducer(
      initialState,
      isLostFound({
        lostFounds,
      })
    );

    expect(state.lostFounds).toEqual(lostFounds);
  });

  it("menggunakan array kosong jika daftar tidak tersedia", () => {
    const state = reducer(
      initialState,
      isLostFound({})
    );

    expect(state.isLostFound).toBe(true);
    expect(state.lostFounds).toEqual([]);
    expect(state.error).toBeNull();
  });

  it("menyimpan detail dari data.lost_found", () => {
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

  it("menyimpan detail dari data.lostFound", () => {
    const item = {
      id: 2,
      title: "Kunci",
    };

    const state = reducer(
      initialState,
      isLostFoundDetail({
        data: {
          lostFound: item,
        },
      })
    );

    expect(state.lostFound).toEqual(item);
  });

  it("menyimpan detail dari lost_found", () => {
    const item = {
      id: 3,
      title: "Tas",
    };

    const state = reducer(
      initialState,
      isLostFoundDetail({
        lost_found: item,
      })
    );

    expect(state.lostFound).toEqual(item);
  });

  it("menyimpan detail dari lostFound", () => {
    const item = {
      id: 4,
      title: "Laptop",
    };

    const state = reducer(
      initialState,
      isLostFoundDetail({
        lostFound: item,
      })
    );

    expect(state.lostFound).toEqual(item);
  });

  it("tidak mengubah detail jika item tidak tersedia", () => {
    const previousState = {
      ...initialState,
      lostFound: {
        id: 99,
        title: "Data Lama",
      },
    };

    const state = reducer(
      previousState,
      isLostFoundDetail({
        data: {},
      })
    );

    expect(state.lostFound).toEqual({
      id: 99,
      title: "Data Lama",
    });

    expect(state.error).toBeNull();
  });

  it("menandai proses tambah berhasil", () => {
    const state = reducer(
      initialState,
      isLostFoundAdd({
        data: {
          lost_found: {
            id: 1,
          },
        },
      })
    );

    expect(state.isLostFoundAdd).toBe(true);
    expect(state.isLostFoundAdded).toBe(true);
    expect(state.error).toBeNull();
  });

  it("menyimpan perubahan dari data.lost_found", () => {
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

  it("menyimpan perubahan dari data.lostFound", () => {
    const item = {
      id: 2,
      title: "Kunci Baru",
    };

    const state = reducer(
      initialState,
      isLostFoundChange({
        data: {
          lostFound: item,
        },
      })
    );

    expect(state.lostFound).toEqual(item);
  });

  it("menyimpan perubahan dari lost_found", () => {
    const item = {
      id: 3,
      title: "Tas Baru",
    };

    const state = reducer(
      initialState,
      isLostFoundChange({
        lost_found: item,
      })
    );

    expect(state.lostFound).toEqual(item);
  });

  it("menyimpan perubahan dari lostFound", () => {
    const item = {
      id: 4,
      title: "Laptop Baru",
    };

    const state = reducer(
      initialState,
      isLostFoundChange({
        lostFound: item,
      })
    );

    expect(state.lostFound).toEqual(item);
  });

  it("tidak mengubah lostFound jika perubahan tidak memiliki item", () => {
    const previousState = {
      ...initialState,
      lostFound: {
        id: 99,
        title: "Data Lama",
      },
    };

    const state = reducer(
      previousState,
      isLostFoundChange({
        data: {},
      })
    );

    expect(state.isLostFoundChange).toBe(true);
    expect(state.isLostFoundChanged).toBe(true);

    expect(state.lostFound).toEqual({
      id: 99,
      title: "Data Lama",
    });

    expect(state.error).toBeNull();
  });

  it("menyimpan perubahan cover dari data.lost_found", () => {
    const item = {
      id: 1,
      title: "Dompet",
      cover: "cover-baru.jpg",
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

  it("menyimpan perubahan cover dari data.lostFound", () => {
    const item = {
      id: 2,
      title: "Kunci",
      cover: "cover-baru.jpg",
    };

    const state = reducer(
      initialState,
      isLostFoundChangeCover({
        data: {
          lostFound: item,
        },
      })
    );

    expect(state.lostFound).toEqual(item);
  });

  it("menyimpan perubahan cover dari lost_found", () => {
    const item = {
      id: 3,
      title: "Tas",
      cover: "cover-baru.jpg",
    };

    const state = reducer(
      initialState,
      isLostFoundChangeCover({
        lost_found: item,
      })
    );

    expect(state.lostFound).toEqual(item);
  });

  it("menyimpan perubahan cover dari lostFound", () => {
    const item = {
      id: 4,
      title: "Laptop",
      cover: "cover-baru.jpg",
    };

    const state = reducer(
      initialState,
      isLostFoundChangeCover({
        lostFound: item,
      })
    );

    expect(state.lostFound).toEqual(item);
  });

  it("tidak mengubah lostFound jika perubahan cover tidak memiliki item", () => {
    const previousState = {
      ...initialState,
      lostFound: {
        id: 99,
        title: "Data Lama",
      },
    };

    const state = reducer(
      previousState,
      isLostFoundChangeCover({
        data: {},
      })
    );

    expect(state.isLostFoundChangeCover).toBe(true);
    expect(state.isLostFoundChangedCover).toBe(true);

    expect(state.lostFound).toEqual({
      id: 99,
      title: "Data Lama",
    });

    expect(state.error).toBeNull();
  });

  it("menandai proses delete berhasil", () => {
    const state = reducer(
      initialState,
      isLostFoundDelete({
        data: {
          success: true,
        },
      })
    );

    expect(state.isLostFoundDelete).toBe(true);
    expect(state.isLostFoundDeleted).toBe(true);
    expect(state.error).toBeNull();
  });

  it("menyimpan statistik dari payload.data", () => {
    const stats = {
      total: 10,
      lost: 4,
      found: 6,
    };

    const state = reducer(
      initialState,
      isLostFoundStats({
        data: stats,
      })
    );

    expect(state.lostFoundStats).toEqual(stats);
    expect(state.error).toBeNull();
  });

  it("menyimpan statistik langsung dari payload", () => {
    const stats = {
      total: 5,
    };

    const state = reducer(
      initialState,
      isLostFoundStats(stats)
    );

    expect(state.lostFoundStats).toEqual(stats);
  });

  it("menggunakan null jika payload statistik bernilai null", () => {
    const state = reducer(
      initialState,
      isLostFoundStats(null)
    );

    expect(state.lostFoundStats).toBeNull();
    expect(state.error).toBeNull();
  });
});