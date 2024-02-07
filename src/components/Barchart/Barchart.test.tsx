import React from "react";
import '@testing-library/jest-dom'
import {render, screen, fireEvent } from '@testing-library/react'

import BarChart from "./BarChart";

describe("Empty Bar Chart", () => {
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
    const renderedComponent = render(<BarChart/>);
    
    const legendElements = renderedComponent.container.querySelectorAll("div.legend-element");

    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Data must not be empty, undefined, or null for Bar Chart.');
    expect(legendElements.length).toBe(0); // Assumes 5 unique data ids

  });

  test("Check Data is empty.", () => {
    render(<BarChart data={[]} />);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Data must not be empty, undefined, or null for Bar Chart.');
  });  


  test("Check Data is undefined.", () => {
    render(<BarChart data={undefined} />);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Data must not be empty, undefined, or null for Bar Chart.');
  });    


  test("Check Data is null.", () => {
    render(<BarChart data={null} />);
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toContain('Data must not be empty, undefined, or null for Bar Chart.');
  });    
});

describe("Horizontal Bar Chart", () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        console.error.mockRestore();
    });

    afterEach(() => {
        console.error.mockClear();
    });

    test("Normal Horizontal Bar Chart.", () => {
        const testData = [
            { id: "Cat", x: 3, y: "Cat" },
            { id: "Dog", x: 21, y: "Dog" },
            { id: "Frog", x: 31, y: "Frog" }
          ];

        const renderedComponent = render(<BarChart data={testData} alignment="horizontal" type="normal" title="Horizontal Bar Chart"/>);

        const barElements = renderedComponent.container.querySelectorAll("rect");
        const headingElement = renderedComponent.container.querySelector("h3");
        const legendElements = renderedComponent.container.querySelectorAll("div.legend-element");

        expect(headingElement).toBeInTheDocument();
        expect(headingElement.textContent).toBe(" Horizontal Bar Chart ");
        expect(barElements.length).toBe(testData.length);
        expect(legendElements.length).toBe(3);

    });

    test("Normal Horizontal Bar Chart No Title.", () => {
        const testData = [
            { id: "Cat", x: 3, y: "Cat" },
            { id: "Dog", x: 21, y: "Dog" },
            { id: "Frog", x: 31, y: "Frog" }
          ];

        const renderedComponent = render(<BarChart data={testData} alignment="horizontal" type="normal"/>);
    
        // Querying elements with more descriptive names
        const barElements = renderedComponent.container.querySelectorAll("rect");
        const headingElement = renderedComponent.container.querySelector("h3");
        const legendElements = renderedComponent.container.querySelectorAll("div.legend-element");
        expect(headingElement).toBeNull();
        expect(barElements.length).toBe(testData.length);
        expect(legendElements.length).toBe(3);
    });
  
    test("Normal Horizontal Bar Chart No Id.", () => {
        const testData = [
            { x: 3, y: "Cat" },
            { x: 21, y: "Dog" },
            {  x: 31, y: "Frog" }
          ];

        const renderedComponent = render(<BarChart data={testData} alignment="horizontal" type="normal"/>);
    
        // Querying elements with more descriptive names
        const barElements = renderedComponent.container.querySelectorAll("rect");
        const headingElement = renderedComponent.container.querySelector("h3");
        const legendElements = renderedComponent.container.querySelectorAll("div.legend-element");
        expect(headingElement).toBeNull();
        expect(barElements.length).toBe(testData.length);
        expect(legendElements.length).toBe(3);
    });    

    test("Stacked Horizontal Bar Chart.", () => {
        const testData = [
            { id: "lol", x: 3, y: "what" },
            { id: "op", x: 12, y: "what" },
            { id: "laol", x: 13, y: "what" },
            { id: "lol", x: 3, y: "ses" },
            { id: "op", x: 21, y: "ses" },
            { id: "laol", x: 31, y: "ses" },
            { id: "lol", x: 2, y: "ex" },
            { id: "op", x: 42, y: "ex" },
            { id: "laol", x: 231, y: "ex" },
            { id: "ladl", x: 154, y: "ex" },
            { id: "rawe", x: 79, y: "ex" }
        ];
        
        const renderedComponent = render(<BarChart data={testData} alignment="horizontal" type="stacked" title="Stacked Horizontal Bar Chart" />);
    
        // Querying elements with more descriptive names
        const barElements = renderedComponent.container.querySelectorAll("rect");
        const headingElement = renderedComponent.container.querySelector("h3");
        const legendElements = renderedComponent.container.querySelectorAll("div.legend-element");
        
        // Expanded assertions with specific checks
        expect(headingElement).toBeInTheDocument();
        expect(headingElement.textContent).toBe(" Stacked Horizontal Bar Chart ");
        expect(legendElements.length).toBe(5); // Assumes 5 unique data ids
        
        // Testing bar elements based on data
        expect(barElements.length).toBe(testData.length);
    });


    test("Grouped Horizontal Bar Chart.", () => {
        const testData = [
            { id: "lol", x: 3, y: "what" },
            { id: "op", x: 12, y: "what" },
            { id: "laol", x: 13, y: "what" },
            { id: "lol", x: 3, y: "ses" },
            { id: "op", x: 21, y: "ses" },
            { id: "laol", x: 31, y: "ses" },
            { id: "lol", x: 2, y: "ex" },
            { id: "op", x: 42, y: "ex" },
            { id: "laol", x: 231, y: "ex" },
            { id: "ladl", x: 154, y: "ex" },
            { id: "rawe", x: 79, y: "ex" }
          ];
        
        const renderedComponent = render(<BarChart data={testData} alignment="horizontal" type="grouped" title="Grouped Horizontal Bar Chart" />);
    
        // Querying elements with more descriptive names
        const barElements = renderedComponent.container.querySelectorAll("rect");
        const headingElement = renderedComponent.container.querySelector("h3");
        const legendElements = renderedComponent.container.querySelectorAll("div.legend-element");
        
        // Expanded assertions with specific checks
        expect(headingElement).toBeInTheDocument();
        expect(headingElement.textContent).toBe(" Grouped Horizontal Bar Chart ");
        expect(legendElements.length).toBe(5); // Assumes 5 unique data ids
        
        // Testing bar elements based on data
        expect(barElements.length).toBe(testData.length);
    });   
    
    
});

describe("Vertical Bar Chart", () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        console.error.mockRestore();
    });

    afterEach(() => {
        console.error.mockClear();
    });

    test("Vertical Bar Chart.", () => {
        const testData = [
            { id: "Cat", y: 3, x: "Cat" },
            { id: "Dog", y: 21, x: "Dog" },
            { id: "Frog", y: 31, x: "Frog" }
          ];

        const renderedComponent = render(<BarChart data={testData} alignment="vertical" type="normal" title="Vertical Bar Chart"/>);

        const barElements = renderedComponent.container.querySelectorAll("rect");
        const headingElement = renderedComponent.container.querySelector("h3");
        const legendElements = renderedComponent.container.querySelectorAll("div.legend-element");

        expect(headingElement).toBeInTheDocument();
        expect(headingElement.textContent).toBe(" Vertical Bar Chart ");
        expect(barElements.length).toBe(testData.length);
        expect(legendElements.length).toBe(3);

    });
  
    test("Normal Vertical Bar Chart No Id.", () => {
        const testData = [
            { y: 3, x: "Cat" },
            { y: 21, x: "Dog" },
            {  y: 31, x: "Frog" }
          ];

        const renderedComponent = render(<BarChart data={testData} alignment="vertical" type="normal"/>);
    
        // Querying elements with more descriptive names
        const barElements = renderedComponent.container.querySelectorAll("rect");
        const headingElement = renderedComponent.container.querySelector("h3");
        const legendElements = renderedComponent.container.querySelectorAll("div.legend-element");
        expect(headingElement).toBeNull();
        expect(barElements.length).toBe(testData.length);
        expect(legendElements.length).toBe(3);
    });    

    test("Stacked Horizontal Bar Chart.", () => {
        const testData = [
            { id: "lol", y: 3, x: "what" },
            { id: "op", y: 12, x: "what" },
            { id: "laol", y: 13, x: "what" },
            { id: "lol", y: 3, x: "ses" },
            { id: "op", y: 21, x: "ses" },
            { id: "laol", y: 31, x: "ses" },
            { id: "lol", y: 2, x: "ex" },
            { id: "op", y: 42, x: "ex" },
            { id: "laol", y: 231, x: "ex" },
            { id: "ladl", y: 154, x: "ex" },
            { id: "rawe", y: 79, x: "ex" }
          ];
        
        const renderedComponent = render(<BarChart data={testData} alignment="vertical" type="stacked" title="Stacked Horizontal Bar Chart" />);
    
        // Querying elements with more descriptive names
        const barElements = renderedComponent.container.querySelectorAll("rect");
        const headingElement = renderedComponent.container.querySelector("h3");
        const legendElements = renderedComponent.container.querySelectorAll("div.legend-element");
        
        // Expanded assertions with specific checks
        expect(headingElement).toBeInTheDocument();
        expect(headingElement.textContent).toBe(" Stacked Horizontal Bar Chart ");
        expect(legendElements.length).toBe(5); // Assumes 5 unique data ids
        
        // Testing bar elements based on data
        expect(barElements.length).toBe(testData.length);
    });


    test("Grouped Vertical Bar Chart.", () => {
        const testData = [
            {"id": "lol", "y": 3, "x": "what"},
            {"id": "op", "y": 12, "x": "what"},
            {"id": "laol", "y": 13, "x": "what"},
            {"id": "lol", "y": 3, "x": "ses"},
            {"id": "op", "y": 21, "x": "ses"},
            {"id": "laol", "y": 31, "x": "ses"},
            {"id": "lol", "y": 2, "x": "ex"},
            {"id": "op", "y": 42, "x": "ex"},
            {"id": "laol", "y": 231, "x": "ex"},
            {"id": "ladl", "y": 154, "x": "ex"},
            {"id": "rawe", "y": 79, "x": "ex"},
        ]
        
        const renderedComponent = render(<BarChart data={testData} alignment="vertical" type="grouped" title="Grouped Vertical Bar Chart" />);
    
        // Querying elements with more descriptive names
        const barElements = renderedComponent.container.querySelectorAll("rect");
        const headingElement = renderedComponent.container.querySelector("h3");
        const legendElements = renderedComponent.container.querySelectorAll("div.legend-element");
        
        // Expanded assertions with specific checks
        expect(headingElement).toBeInTheDocument();
        expect(headingElement.textContent).toBe(" Grouped Vertical Bar Chart ");
        expect(legendElements.length).toBe(5); // Assumes 5 unique data ids
        
        // Testing bar elements based on data
        expect(barElements.length).toBe(testData.length);
    });   
});

describe("Interactivity Bar Chart", () => {
    test("Barchart Tooltip.", () => {
        const testData = [
            { id: "Cat", y: 3, x: "Cat" },
            { id: "Dog", y: 21, x: "Dog" },
            { id: "Frog", y: 31, x: "Frog" }
          ];

        const renderedComponent = render(<BarChart data={testData} alignment="vertical" type="normal" title="Vertical Bar Chart"/>);

        fireEvent.mouseOver(screen.getByTestId('test-rect'));
        expect(renderedComponent).toMatchSnapshot();

        fireEvent.mouseMove(screen.getByTestId('test-rect'));
        expect(renderedComponent).toMatchSnapshot();

        fireEvent.mouseOut(screen.getByTestId('test-rect'));
        expect(renderedComponent).toMatchSnapshot();
    });

    test("Barchart legend data selection.", () => {
        const testData = [
            { id: "Cat", y: 3, x: "Cat" },
            { id: "Dog", y: 21, x: "Dog" },
            { id: "Frog", y: 31, x: "Frog" }
          ];

        const renderedComponent = render(<BarChart data={testData} alignment="vertical" type="normal" title="Vertical Bar Chart"/>);

        fireEvent.click(screen.getAllByText('Cat')[0]);
        expect(renderedComponent).toMatchSnapshot();

        fireEvent.click(screen.getAllByText('Cat')[0]);
        expect(renderedComponent).toMatchSnapshot();
    });

});
