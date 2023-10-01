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

describe("Empty or Null Factor for Exponential or Log Scales.", () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        console.error.mockRestore();
    });

    afterEach(() => {
        console.error.mockClear();
    });

    test("Check Factor is null for Exponential Scale.", () => {
        render(<LineChart data={        
                [{
                    id: 1,
                    data: [{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":4},{"x":3,"y":9},{"x":4,"y":16},{"x":5,"y":25},{"x":6,"y":36},{"x":7,"y":49},{"x":8,"y":64},{"x":9,"y":81},{"x":10,"y":100},{"x":11,"y":121},{"x":12,"y":144},{"x":13,"y":169},{"x":14,"y":196},{"x":15,"y":225},{"x":16,"y":256},{"x":17,"y":289},{"x":18,"y":324},{"x":19,"y":361},{"x":20,"y":400},{"x":21,"y":441},{"x":22,"y":484},{"x":23,"y":529},{"x":24,"y":576},{"x":25,"y":625},{"x":26,"y":676},{"x":27,"y":729},{"x":28,"y":784},{"x":29,"y":841},{"x":30,"y":900},{"x":31,"y":961},{"x":32,"y":1024},{"x":33,"y":1089},{"x":34,"y":1156},{"x":35,"y":1225},{"x":36,"y":1296},{"x":37,"y":1369},{"x":38,"y":1444},{"x":39,"y":1521},{"x":40,"y":1600},{"x":41,"y":1681},{"x":42,"y":1764},{"x":43,"y":1849},{"x":44,"y":1936},{"x":45,"y":2025},{"x":46,"y":2116},{"x":47,"y":2209},{"x":48,"y":2304},{"x":49,"y":2401},{"x":50,"y":2500}]
                }]
            }
            scale="exp"
            factor={null}             
        />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls[0][0]).toContain('Line Chart requires exponent for exponential scale.');
      });  

      test("Check Factor is string for Exponential Scale.", () => {
        render(<LineChart data={        
                [{
                    id: 1,
                    data: [{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":4},{"x":3,"y":9},{"x":4,"y":16},{"x":5,"y":25},{"x":6,"y":36},{"x":7,"y":49},{"x":8,"y":64},{"x":9,"y":81},{"x":10,"y":100},{"x":11,"y":121},{"x":12,"y":144},{"x":13,"y":169},{"x":14,"y":196},{"x":15,"y":225},{"x":16,"y":256},{"x":17,"y":289},{"x":18,"y":324},{"x":19,"y":361},{"x":20,"y":400},{"x":21,"y":441},{"x":22,"y":484},{"x":23,"y":529},{"x":24,"y":576},{"x":25,"y":625},{"x":26,"y":676},{"x":27,"y":729},{"x":28,"y":784},{"x":29,"y":841},{"x":30,"y":900},{"x":31,"y":961},{"x":32,"y":1024},{"x":33,"y":1089},{"x":34,"y":1156},{"x":35,"y":1225},{"x":36,"y":1296},{"x":37,"y":1369},{"x":38,"y":1444},{"x":39,"y":1521},{"x":40,"y":1600},{"x":41,"y":1681},{"x":42,"y":1764},{"x":43,"y":1849},{"x":44,"y":1936},{"x":45,"y":2025},{"x":46,"y":2116},{"x":47,"y":2209},{"x":48,"y":2304},{"x":49,"y":2401},{"x":50,"y":2500}]
                }]
            }
            scale="exp"
            factor={""}             
        />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls[0][0]).toContain('Line Chart requires exponent for exponential scale.');
      });  

      test("Check Factor is array for Exponential Scale.", () => {
        render(<LineChart data={        
                [{
                    id: 1,
                    data: [{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":4},{"x":3,"y":9},{"x":4,"y":16},{"x":5,"y":25},{"x":6,"y":36},{"x":7,"y":49},{"x":8,"y":64},{"x":9,"y":81},{"x":10,"y":100},{"x":11,"y":121},{"x":12,"y":144},{"x":13,"y":169},{"x":14,"y":196},{"x":15,"y":225},{"x":16,"y":256},{"x":17,"y":289},{"x":18,"y":324},{"x":19,"y":361},{"x":20,"y":400},{"x":21,"y":441},{"x":22,"y":484},{"x":23,"y":529},{"x":24,"y":576},{"x":25,"y":625},{"x":26,"y":676},{"x":27,"y":729},{"x":28,"y":784},{"x":29,"y":841},{"x":30,"y":900},{"x":31,"y":961},{"x":32,"y":1024},{"x":33,"y":1089},{"x":34,"y":1156},{"x":35,"y":1225},{"x":36,"y":1296},{"x":37,"y":1369},{"x":38,"y":1444},{"x":39,"y":1521},{"x":40,"y":1600},{"x":41,"y":1681},{"x":42,"y":1764},{"x":43,"y":1849},{"x":44,"y":1936},{"x":45,"y":2025},{"x":46,"y":2116},{"x":47,"y":2209},{"x":48,"y":2304},{"x":49,"y":2401},{"x":50,"y":2500}]
                }]
            }
            scale="exp"
            factor={[]}             
        />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls[0][0]).toContain('Line Chart requires exponent for exponential scale.');
      });  

      test("Check Factor is object for Exponential Scale.", () => {
        render(<LineChart data={        
                [{
                    id: 1,
                    data: [{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":4},{"x":3,"y":9},{"x":4,"y":16},{"x":5,"y":25},{"x":6,"y":36},{"x":7,"y":49},{"x":8,"y":64},{"x":9,"y":81},{"x":10,"y":100},{"x":11,"y":121},{"x":12,"y":144},{"x":13,"y":169},{"x":14,"y":196},{"x":15,"y":225},{"x":16,"y":256},{"x":17,"y":289},{"x":18,"y":324},{"x":19,"y":361},{"x":20,"y":400},{"x":21,"y":441},{"x":22,"y":484},{"x":23,"y":529},{"x":24,"y":576},{"x":25,"y":625},{"x":26,"y":676},{"x":27,"y":729},{"x":28,"y":784},{"x":29,"y":841},{"x":30,"y":900},{"x":31,"y":961},{"x":32,"y":1024},{"x":33,"y":1089},{"x":34,"y":1156},{"x":35,"y":1225},{"x":36,"y":1296},{"x":37,"y":1369},{"x":38,"y":1444},{"x":39,"y":1521},{"x":40,"y":1600},{"x":41,"y":1681},{"x":42,"y":1764},{"x":43,"y":1849},{"x":44,"y":1936},{"x":45,"y":2025},{"x":46,"y":2116},{"x":47,"y":2209},{"x":48,"y":2304},{"x":49,"y":2401},{"x":50,"y":2500}]
                }]
            }
            scale="exp"
            factor={{x:3, y:2}}             
        />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls[0][0]).toContain('Line Chart requires exponent for exponential scale.');
      });  

      test("Check Factor is undefined for Exponential Scale.", () => {
        render(<LineChart data={        
                [{
                    id: 1,
                    data: [{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":4},{"x":3,"y":9},{"x":4,"y":16},{"x":5,"y":25},{"x":6,"y":36},{"x":7,"y":49},{"x":8,"y":64},{"x":9,"y":81},{"x":10,"y":100},{"x":11,"y":121},{"x":12,"y":144},{"x":13,"y":169},{"x":14,"y":196},{"x":15,"y":225},{"x":16,"y":256},{"x":17,"y":289},{"x":18,"y":324},{"x":19,"y":361},{"x":20,"y":400},{"x":21,"y":441},{"x":22,"y":484},{"x":23,"y":529},{"x":24,"y":576},{"x":25,"y":625},{"x":26,"y":676},{"x":27,"y":729},{"x":28,"y":784},{"x":29,"y":841},{"x":30,"y":900},{"x":31,"y":961},{"x":32,"y":1024},{"x":33,"y":1089},{"x":34,"y":1156},{"x":35,"y":1225},{"x":36,"y":1296},{"x":37,"y":1369},{"x":38,"y":1444},{"x":39,"y":1521},{"x":40,"y":1600},{"x":41,"y":1681},{"x":42,"y":1764},{"x":43,"y":1849},{"x":44,"y":1936},{"x":45,"y":2025},{"x":46,"y":2116},{"x":47,"y":2209},{"x":48,"y":2304},{"x":49,"y":2401},{"x":50,"y":2500}]
                }]
            }
            scale="exp"
            factor={undefined}             
        />);
        expect(console.error).not.toHaveBeenCalled();
      });  

      test("Check Factor is null for Exponential Scale.", () => {
        render(<LineChart data={        
                [{
                    id: 1,
                    data: [{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":4},{"x":3,"y":9},{"x":4,"y":16},{"x":5,"y":25},{"x":6,"y":36},{"x":7,"y":49},{"x":8,"y":64},{"x":9,"y":81},{"x":10,"y":100},{"x":11,"y":121},{"x":12,"y":144},{"x":13,"y":169},{"x":14,"y":196},{"x":15,"y":225},{"x":16,"y":256},{"x":17,"y":289},{"x":18,"y":324},{"x":19,"y":361},{"x":20,"y":400},{"x":21,"y":441},{"x":22,"y":484},{"x":23,"y":529},{"x":24,"y":576},{"x":25,"y":625},{"x":26,"y":676},{"x":27,"y":729},{"x":28,"y":784},{"x":29,"y":841},{"x":30,"y":900},{"x":31,"y":961},{"x":32,"y":1024},{"x":33,"y":1089},{"x":34,"y":1156},{"x":35,"y":1225},{"x":36,"y":1296},{"x":37,"y":1369},{"x":38,"y":1444},{"x":39,"y":1521},{"x":40,"y":1600},{"x":41,"y":1681},{"x":42,"y":1764},{"x":43,"y":1849},{"x":44,"y":1936},{"x":45,"y":2025},{"x":46,"y":2116},{"x":47,"y":2209},{"x":48,"y":2304},{"x":49,"y":2401},{"x":50,"y":2500}]
                }]
            }
            scale="exp"
            factor={null}             
        />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls[0][0]).toContain('Line Chart requires exponent for exponential scale.');
      });  

      test("Check Factor is string for Log Scale.", () => {
        render(<LineChart data={        
                [{
                    id: 1,
                    data: [{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":4},{"x":3,"y":9},{"x":4,"y":16},{"x":5,"y":25},{"x":6,"y":36},{"x":7,"y":49},{"x":8,"y":64},{"x":9,"y":81},{"x":10,"y":100},{"x":11,"y":121},{"x":12,"y":144},{"x":13,"y":169},{"x":14,"y":196},{"x":15,"y":225},{"x":16,"y":256},{"x":17,"y":289},{"x":18,"y":324},{"x":19,"y":361},{"x":20,"y":400},{"x":21,"y":441},{"x":22,"y":484},{"x":23,"y":529},{"x":24,"y":576},{"x":25,"y":625},{"x":26,"y":676},{"x":27,"y":729},{"x":28,"y":784},{"x":29,"y":841},{"x":30,"y":900},{"x":31,"y":961},{"x":32,"y":1024},{"x":33,"y":1089},{"x":34,"y":1156},{"x":35,"y":1225},{"x":36,"y":1296},{"x":37,"y":1369},{"x":38,"y":1444},{"x":39,"y":1521},{"x":40,"y":1600},{"x":41,"y":1681},{"x":42,"y":1764},{"x":43,"y":1849},{"x":44,"y":1936},{"x":45,"y":2025},{"x":46,"y":2116},{"x":47,"y":2209},{"x":48,"y":2304},{"x":49,"y":2401},{"x":50,"y":2500}]
                }]
            }
            scale="log"
            factor={""}             
        />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls[0][0]).toContain('Line Chart requires base for logarithmic scale.');
      });  

      test("Check Factor is array for Log Scale.", () => {
        render(<LineChart data={        
                [{
                    id: 1,
                    data: [{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":4},{"x":3,"y":9},{"x":4,"y":16},{"x":5,"y":25},{"x":6,"y":36},{"x":7,"y":49},{"x":8,"y":64},{"x":9,"y":81},{"x":10,"y":100},{"x":11,"y":121},{"x":12,"y":144},{"x":13,"y":169},{"x":14,"y":196},{"x":15,"y":225},{"x":16,"y":256},{"x":17,"y":289},{"x":18,"y":324},{"x":19,"y":361},{"x":20,"y":400},{"x":21,"y":441},{"x":22,"y":484},{"x":23,"y":529},{"x":24,"y":576},{"x":25,"y":625},{"x":26,"y":676},{"x":27,"y":729},{"x":28,"y":784},{"x":29,"y":841},{"x":30,"y":900},{"x":31,"y":961},{"x":32,"y":1024},{"x":33,"y":1089},{"x":34,"y":1156},{"x":35,"y":1225},{"x":36,"y":1296},{"x":37,"y":1369},{"x":38,"y":1444},{"x":39,"y":1521},{"x":40,"y":1600},{"x":41,"y":1681},{"x":42,"y":1764},{"x":43,"y":1849},{"x":44,"y":1936},{"x":45,"y":2025},{"x":46,"y":2116},{"x":47,"y":2209},{"x":48,"y":2304},{"x":49,"y":2401},{"x":50,"y":2500}]
                }]
            }
            scale="log"
            factor={[]}             
        />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls[0][0]).toContain('Line Chart requires base for logarithmic scale.');
      });  

      test("Check Factor is object for Log Scale.", () => {
        render(<LineChart data={        
                [{
                    id: 1,
                    data: [{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":4},{"x":3,"y":9},{"x":4,"y":16},{"x":5,"y":25},{"x":6,"y":36},{"x":7,"y":49},{"x":8,"y":64},{"x":9,"y":81},{"x":10,"y":100},{"x":11,"y":121},{"x":12,"y":144},{"x":13,"y":169},{"x":14,"y":196},{"x":15,"y":225},{"x":16,"y":256},{"x":17,"y":289},{"x":18,"y":324},{"x":19,"y":361},{"x":20,"y":400},{"x":21,"y":441},{"x":22,"y":484},{"x":23,"y":529},{"x":24,"y":576},{"x":25,"y":625},{"x":26,"y":676},{"x":27,"y":729},{"x":28,"y":784},{"x":29,"y":841},{"x":30,"y":900},{"x":31,"y":961},{"x":32,"y":1024},{"x":33,"y":1089},{"x":34,"y":1156},{"x":35,"y":1225},{"x":36,"y":1296},{"x":37,"y":1369},{"x":38,"y":1444},{"x":39,"y":1521},{"x":40,"y":1600},{"x":41,"y":1681},{"x":42,"y":1764},{"x":43,"y":1849},{"x":44,"y":1936},{"x":45,"y":2025},{"x":46,"y":2116},{"x":47,"y":2209},{"x":48,"y":2304},{"x":49,"y":2401},{"x":50,"y":2500}]
                }]
            }
            scale="log"
            factor={{x:3, y:2}}             
        />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls[0][0]).toContain('Line Chart requires base for logarithmic scale.');
      });  

      test("Check Factor is undefined for Log Scale.", () => {
        render(<LineChart data={        
                [{
                    id: 1,
                    data: [{"x":0,"y":0},{"x":1,"y":1},{"x":2,"y":4},{"x":3,"y":9},{"x":4,"y":16},{"x":5,"y":25},{"x":6,"y":36},{"x":7,"y":49},{"x":8,"y":64},{"x":9,"y":81},{"x":10,"y":100},{"x":11,"y":121},{"x":12,"y":144},{"x":13,"y":169},{"x":14,"y":196},{"x":15,"y":225},{"x":16,"y":256},{"x":17,"y":289},{"x":18,"y":324},{"x":19,"y":361},{"x":20,"y":400},{"x":21,"y":441},{"x":22,"y":484},{"x":23,"y":529},{"x":24,"y":576},{"x":25,"y":625},{"x":26,"y":676},{"x":27,"y":729},{"x":28,"y":784},{"x":29,"y":841},{"x":30,"y":900},{"x":31,"y":961},{"x":32,"y":1024},{"x":33,"y":1089},{"x":34,"y":1156},{"x":35,"y":1225},{"x":36,"y":1296},{"x":37,"y":1369},{"x":38,"y":1444},{"x":39,"y":1521},{"x":40,"y":1600},{"x":41,"y":1681},{"x":42,"y":1764},{"x":43,"y":1849},{"x":44,"y":1936},{"x":45,"y":2025},{"x":46,"y":2116},{"x":47,"y":2209},{"x":48,"y":2304},{"x":49,"y":2401},{"x":50,"y":2500}]
                }]
            }
            scale="log"
            factor={undefined}             
        />);
        expect(console.error).not.toHaveBeenCalled();
      });  


});