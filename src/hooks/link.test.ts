import { useRouter } from "next/router";
import { useLinkResetQuery } from "./link";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const router = useRouter as jest.Mock;

beforeEach(() => {
  router.mockReset();
});

test("key: foo, query: { foo: foo1 }", () => {
  router.mockReturnValue({
    query: {
      foo: "foo1",
    },
  });
  expect(useLinkResetQuery("foo")).toEqual({});
});

test("key: foo, query: { foo: foo1, page: 10 }", () => {
  router.mockReturnValue({
    query: {
      foo: "foo1",
      page: 10,
    },
  });
  expect(useLinkResetQuery("foo")).toEqual({});
});

test("key: foo, query: { bar: bar1 }", () => {
  router.mockReturnValue({
    query: {
      bar: "bar1",
    },
  });
  expect(useLinkResetQuery("foo")).toEqual({ bar: "bar1" });
});

test("key: foo, query: { bar: bar1, page: 10 }", () => {
  router.mockReturnValue({
    query: {
      bar: "bar1",
      page: 10,
    },
  });
  expect(useLinkResetQuery("foo")).toEqual({ bar: "bar1" });
});
