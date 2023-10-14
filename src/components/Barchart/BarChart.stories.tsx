import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import BarChart from './BarChart'

const meta: Meta<typeof BarChart> = {
    title: "Components/BarChart",
    component: BarChart,
    tags: ['autodocs'],    
  };

export default meta;

type Story = StoryObj<typeof BarChart>;

export const Stacked: Story = {
  args: {
    data: [
      {
        id: "lol",
        x: 3,
        y: "what"
      },
      {
        id: "op",
        x: 12,
        y: "what"
      },
      {
        id: "laol",
        x: 13,
        y: "what"
      }, 
      {
        id: "lol",
        x: 3,
        y: "ses"
      },
      {
        id: "op",
        x: 21,
        y: "ses"
      },
      {
        id: "laol",
        x: 31,
        y: "ses"
      }, 
      {
        id: "lol",
        x: 2,
        y: "ex"
      },
      {
        id: "op",
        x: 42,
        y: "ex"
      },
      {
        id: "laol",
        x: 231,
        y: "ex"
      }, 
      {
        id: "ladl",
        x: 154,
        y: "ex"
      },
      {
        id: "rawe",
        x: 79,
        y: "ex"
      }                           
    ],
    alignment: "horizontal",
    type: "Stacked",
    title: "Stacked Horizontal Bar Chart",
    width: 500,
    height: 300,
    marginLeft: 25,
  },
};


export const Grouped: Story = {
  args: {
    data: [
      {
        id: "lol",
        x: 3,
        y: "what"
      },
      {
        id: "op",
        x: 12,
        y: "what"
      },
      {
        id: "laol",
        x: 13,
        y: "what"
      }, 
      {
        id: "lol",
        x: 3,
        y: "ses"
      },
      {
        id: "op",
        x: 21,
        y: "ses"
      },
      {
        id: "laol",
        x: 31,
        y: "ses"
      }, 
      {
        id: "lol",
        x: 2,
        y: "ex"
      },
      {
        id: "op",
        x: 42,
        y: "ex"
      },
      {
        id: "laol",
        x: 231,
        y: "ex"
      }, 
      {
        id: "ladl",
        x: 154,
        y: "ex"
      },
      {
        id: "rawe",
        x: 79,
        y: "ex"
      }                           
    ],
    alignment: "horizontal",
    type: "Grouped",
    title: "Grouped Horizontal Bar Chart",
    width: 500,
    height: 300,
    marginLeft: 25,
  },
};

export const Horizontal: Story = {
  args: {
    data: [
      {
        x: 3,
        y: "what"
      },
      {
        x: 21,
        y: "ses"
      },
      {
        x: 31,
        y: "ex"
      },                       
    ],
    alignment: "horizontal",
    type: "normal",
    title: "Horizontal Bar Chart",
    width: 500,
    height: 300,
    marginLeft: 25,
  },
};

export const Vertical: Story = {
  args: {
    data: [
      {
        x: "what",
        y: 20
      },
      {
        x: "ses",
        y: 42
      },
      {
        x: "ex",
        y: 10
      },                       
    ],
    alignment: "vertical",
    type: "normal",
    title: "Vertical Bar Chart",
    width: 500,
    height: 300,
    marginLeft: 25,
  },
};

export const StackedVertical: Story = {
  args: {
    data: [
      {
        id: "lol",
        y: 3,
        x: "what"
      },
      {
        id: "op",
        y: 12,
        x: "what"
      },
      {
        id: "laol",
        y: 13,
        x: "what"
      }, 
      {
        id: "lol",
        y: 3,
        x: "ses"
      },
      {
        id: "op",
        y: 21,
        x: "ses"
      },
      {
        id: "laol",
        y: 31,
        x: "ses"
      }, 
      {
        id: "lol",
        y: 2,
        x: "ex"
      },
      {
        id: "op",
        y: 42,
        x: "ex"
      },
      {
        id: "laol",
        y: 231,
        x: "ex"
      }, 
      {
        id: "ladl",
        y: 154,
        x: "ex"
      },
      {
        id: "rawe",
        y: 79,
        x: "ex"
      }                           
    ],
    alignment: "vertical",
    type: "Stacked",
    title: "Stacked Vertical Bar Chart",
    width: 500,
    height: 300,
    marginLeft: 25,
  },
};

export const GroupedVertical: Story = {
  args: {
    data: [
      {
        id: "lol",
        y: 3,
        x: "what"
      },
      {
        id: "op",
        y: 12,
        x: "what"
      },
      {
        id: "laol",
        y: 13,
        x: "what"
      }, 
      {
        id: "lol",
        y: 3,
        x: "ses"
      },
      {
        id: "op",
        y: 21,
        x: "ses"
      },
      {
        id: "laol",
        y: 31,
        x: "ses"
      }, 
      {
        id: "lol",
        y: 2,
        x: "ex"
      },
      {
        id: "op",
        y: 42,
        x: "ex"
      },
      {
        id: "laol",
        y: 231,
        x: "ex"
      }, 
      {
        id: "ladl",
        y: 154,
        x: "ex"
      },
      {
        id: "rawe",
        y: 79,
        x: "ex"
      }                           
    ],
    alignment: "vertical",
    type: "Grouped",
    title: "Grouped Vertical Bar Chart",
    width: 500,
    height: 300,
    marginLeft: 25,
  },
};

export const Empty: Story = {
    args: {
      data: [],
      width: 500,
      height: 300,
    },
  };
