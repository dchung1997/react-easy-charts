import React from "react";
import '@testing-library/jest-dom'
import {render, screen } from '@testing-library/react'

import LineChart from "./LineChart";

describe("Empty Linechart", () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        console.error.mockRestore();
    });

    afterEach(() => {
        console.error.mockClear();
    });

  test("Check Data is not passed.", () => {
    render(<LineChart/>);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Data must not be empty, undefined, or null for Line Chart.');
  });

  test("Check Data is empty.", () => {
    render(<LineChart data={[]} />);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Data must not be empty, undefined, or null for Line Chart.');
  });  


  test("Check Data is undefined.", () => {
    render(<LineChart data={undefined} />);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Data must not be empty, undefined, or null for Line Chart.');
  });    


  test("Check Data is null.", () => {
    render(<LineChart data={null} />);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Data must not be empty, undefined, or null for Line Chart.');
  });    
});