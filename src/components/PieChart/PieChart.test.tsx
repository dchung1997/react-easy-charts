import React from "react";
import '@testing-library/jest-dom'
import {render, screen, fireEvent } from '@testing-library/react'

import PieChart from "./PieChart";

describe("Empty PieChart", () => {
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
    render(<PieChart/>);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Data must not be empty, undefined, or null for Pie Chart.');
  });

  test("Check Data is empty.", () => {
    render(<PieChart data={[]} />);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Data must not be empty, undefined, or null for Pie Chart.');
  });  


  test("Check Data is undefined.", () => {
    render(<PieChart data={undefined} />);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Data must not be empty, undefined, or null for Pie Chart.');
  });    


  test("Check Data is null.", () => {
    render(<PieChart data={null} />);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Data must not be empty, undefined, or null for Pie Chart.');
  });    
});

describe("Malformated Data PieChart", () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {}); 
    });

    afterAll(() => {
        console.error.mockRestore();
    });

    afterEach(() => {
        console.error.mockClear();
    });

  test("Check Data contains key name.", () => {
    const testData = [
        { abc: 123 },
        { def: 321 }
    ];
    render(<PieChart data = {testData} />);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Name for Data must be defined.');
  });

  test("Check Data contains key value.", () => {
    const testData = [
        { name: "t", test:"test" },
        { name: "test", test: "test" }
    ];
    render(<PieChart data={testData} />);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Value for Data must be defined.');
  });  


  test("Check Data key name is string.", () => {
    const testData = [
        { name: 123, value:"test" },
        { name: 321, value: "test" }
    ];
    render(<PieChart data={testData} />);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Name for Data in Pie Chart must be a string.');
  });    


  test("Check Data key value is number.", () => {
    const testData = [
        { name: "t", value:"test" },
        { name: "test", value: "test" }
    ];
    render(<PieChart data={testData} />);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Value for Data in Pie Chart must be a number.');
  });    
});

describe("Pie Chart", () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        console.error.mockRestore();
    });

    afterEach(() => {
        console.error.mockClear();
    });

    test("Normal Pie Chart.", () => {
        const testData =  [{"name": "<5", "value": 19912018}, {"name": "5-9", "value": 20501982}, {"name": "10-14", "value": 20679786}, {"name": "15-19", "value": 21354481}, {"name": "20-24", "value": 22604232}, {"name": "25-29", "value": 21698010}, {"name": "30-34", "value": 21183639}, {"name": "35-39", "value": 19855782}, {"name": "40-44", "value": 20796128}, {"name": "45-49", "value": 21370368}, {"name": "50-54", "value": 22525490}, {"name": "55-59", "value": 21001947}, {"name": "60-64", "value": 18415681}, {"name": "65-69", "value": 14547446}, {"name": "70-74", "value": 10587721}, {"name": "75-79", "value": 7730129}, {"name": "80-84", "value": 5811429}, {"name": "\u226585", "value": 5938752}];

        const renderedComponent = render(<PieChart
            data = {testData}
            title = {"U.S. Census Data"}
            titleAlignment = {"center"}
            width = {500}
            height = {400}
            marginLeft = {30}
            toolTipFormat = {"0.0f"}
            radiusInner = {0.0}
            radiusOuter = {1}
        />);

        const pathElements = renderedComponent.container.querySelectorAll("path");
        const headingElement = renderedComponent.container.querySelector("h3");
        const legendElements = renderedComponent.container.querySelectorAll("div.legend-element");

        expect(headingElement).toBeInTheDocument();
        expect(headingElement.textContent).toBe(" U.S. Census Data ");
        expect(pathElements.length).toBe(testData.length);
        expect(legendElements.length).toBe(18);
    });

    test("Normal Donut Chart.", () => {
        const testData =  [{"name": "<5", "value": 19912018}, {"name": "5-9", "value": 20501982}, {"name": "10-14", "value": 20679786}, {"name": "15-19", "value": 21354481}, {"name": "20-24", "value": 22604232}, {"name": "25-29", "value": 21698010}, {"name": "30-34", "value": 21183639}, {"name": "35-39", "value": 19855782}, {"name": "40-44", "value": 20796128}, {"name": "45-49", "value": 21370368}, {"name": "50-54", "value": 22525490}, {"name": "55-59", "value": 21001947}, {"name": "60-64", "value": 18415681}, {"name": "65-69", "value": 14547446}, {"name": "70-74", "value": 10587721}, {"name": "75-79", "value": 7730129}, {"name": "80-84", "value": 5811429}, {"name": "\u226585", "value": 5938752}];

        const renderedComponent = render(<PieChart
            data = {testData}
            title = {"U.S. Census Data"}
            titleAlignment = {"center"}
            width = {500}
            height = {400}
            marginLeft = {30}
            toolTipFormat = {"0.0f"}
            radiusInner = {0.67}
            radiusOuter = {1}
        />);

        const pathElements = renderedComponent.container.querySelectorAll("path");
        const headingElement = renderedComponent.container.querySelector("h3");
        const legendElements = renderedComponent.container.querySelectorAll("div.legend-element");

        expect(headingElement).toBeInTheDocument();
        expect(headingElement.textContent).toBe(" U.S. Census Data ");
        expect(pathElements.length).toBe(testData.length);
        expect(legendElements.length).toBe(18);
    });
});

describe("Interactivity Pie Chart", () => {
    test("PieChart legend data selection.", () => {
        const testData =  [{"name": "<5", "value": 19912018}, {"name": "5-9", "value": 20501982}, {"name": "10-14", "value": 20679786}, {"name": "15-19", "value": 21354481}, {"name": "20-24", "value": 22604232}, {"name": "25-29", "value": 21698010}, {"name": "30-34", "value": 21183639}, {"name": "35-39", "value": 19855782}, {"name": "40-44", "value": 20796128}, {"name": "45-49", "value": 21370368}, {"name": "50-54", "value": 22525490}, {"name": "55-59", "value": 21001947}, {"name": "60-64", "value": 18415681}, {"name": "65-69", "value": 14547446}, {"name": "70-74", "value": 10587721}, {"name": "75-79", "value": 7730129}, {"name": "80-84", "value": 5811429}, {"name": "\u226585", "value": 5938752}];

        const renderedComponent = render(<PieChart
            data = {testData}
            title = {"U.S. Census Data"}
            titleAlignment = {"center"}
            width = {500}
            height = {400}
            marginLeft = {30}
            toolTipFormat = {"0.0f"}
            radiusInner = {0.0}
            radiusOuter = {1}
        />);

        fireEvent.click(screen.getAllByText('<5')[0]);
        expect(renderedComponent).toMatchSnapshot();

        fireEvent.click(screen.getAllByText('<5')[0]);
        expect(renderedComponent).toMatchSnapshot();
    });
});
