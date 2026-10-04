import { describe, expect, it, vi } from "vitest";

import {
  getLostFounds,
  getLostFound,
  addLostFound,
  updateLostFound,
  updateLostFoundCover,
  deleteLostFound,
  getLostFoundStatsDaily,
  getLostFoundStatsMonthly,
} from "./lostFoundApi";

import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
} from "../../../helpers/apiHelper";

vi.mock("../../../helpers/apiHelper", () => ({
  apiGet: vi.fn(),
  apiPost: vi.fn(),
  apiPut: vi.fn(),
  apiDelete: vi.fn(),
}));

describe("lostFoundApi", () => {
  it("getLostFounds memanggil apiGet", async () => {
    const response = {
      data: {
        lost_founds: [],
      },
    };

    apiGet.mockResolvedValue(response);

    const result = await getLostFounds({
      status: "lost",
    });

    expect(apiGet).toHaveBeenCalledWith(
      "/lost-founds",
      {
        status: "lost",
      }
    );

    expect(result).toEqual(response);
  });

  it("getLostFound memanggil apiGet dengan id", async () => {
    const response = {
      data: {
        lost_found: {
          id: 1,
        },
      },
    };

    apiGet.mockResolvedValue(response);

    const result = await getLostFound(1);

    expect(apiGet).toHaveBeenCalledWith(
      "/lost-founds/1"
    );

    expect(result).toEqual(response);
  });

  it("addLostFound memanggil apiPost", async () => {
    const data = {
      title: "Dompet",
      description: "Dompet hitam",
      status: "lost",
    };

    const response = {
      data: {
        lost_found: data,
      },
    };

    apiPost.mockResolvedValue(response);

    const result = await addLostFound(data);

    expect(apiPost).toHaveBeenCalledWith(
      "/lost-founds",
      data
    );

    expect(result).toEqual(response);
  });

  it("updateLostFound memanggil apiPut", async () => {
    const data = {
      title: "Dompet baru",
      description: "Dompet hitam",
      status: "lost",
      is_completed: 1,
    };

    const response = {
      data: {
        lost_found: {
          id: 1,
          ...data,
        },
      },
    };

    apiPut.mockResolvedValue(response);

    const result = await updateLostFound(1, data);

    expect(apiPut).toHaveBeenCalledWith(
      "/lost-founds/1",
      data
    );

    expect(result).toEqual(response);
  });

  it("updateLostFoundCover memanggil apiPost", async () => {
    const formData = new FormData();

    formData.append(
      "cover",
      new File(["image"], "cover.jpg", {
        type: "image/jpeg",
      })
    );

    const response = {
      data: {
        lost_found: {
          id: 1,
        },
      },
    };

    apiPost.mockResolvedValue(response);

    const result = await updateLostFoundCover(
      1,
      formData
    );

    expect(apiPost).toHaveBeenCalledWith(
      "/lost-founds/1/cover",
      formData
    );

    expect(result).toEqual(response);
  });

  it("deleteLostFound memanggil apiDelete", async () => {
    const response = {
      status: "success",
    };

    apiDelete.mockResolvedValue(response);

    const result = await deleteLostFound(1);

    expect(apiDelete).toHaveBeenCalledWith(
      "/lost-founds/1"
    );

    expect(result).toEqual(response);
  });

  it("getLostFoundStatsDaily memanggil apiGet", async () => {
    const params = {
      date: "2026-10-04",
    };

    const response = {
      data: [],
    };

    apiGet.mockResolvedValue(response);

    const result =
      await getLostFoundStatsDaily(params);

    expect(apiGet).toHaveBeenCalledWith(
      "/lost-founds/stats/daily",
      params
    );

    expect(result).toEqual(response);
  });

  it("getLostFoundStatsMonthly memanggil apiGet", async () => {
    const params = {
      month: "2026-10",
    };

    const response = {
      data: [],
    };

    apiGet.mockResolvedValue(response);

    const result =
      await getLostFoundStatsMonthly(params);

    expect(apiGet).toHaveBeenCalledWith(
      "/lost-founds/stats/monthly",
      params
    );

    expect(result).toEqual(response);
  });
});