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
        id: "Central",
        x: 3,
        y: "Dolor"
      },
      {
        id: "East",
        x: 12,
        y: "Dolor"
      },
      {
        id: "West",
        x: 13,
        y: "Dolor"
      }, 
      {
        id: "Central",
        x: 3,
        y: "Sit"
      },
      {
        id: "East",
        x: 21,
        y: "Sit"
      },
      {
        id: "West",
        x: 31,
        y: "Sit"
      }, 
      {
        id: "Central",
        x: 2,
        y: "Amet"
      },
      {
        id: "East",
        x: 42,
        y: "Amet"
      },
      {
        id: "West",
        x: 231,
        y: "Amet"
      }
    ],
    alignment: "horizontal",
    type: "Stacked",
    title: "Stacked Horizontal Bar Chart",
    width: 500,
    height: 300,
    marginLeft: 35,
  },
};


export const Grouped: Story = {
  args: {
    data: [
      {
        id: "Central",
        x: 3,
        y: "Dolor"
      },
      {
        id: "East",
        x: 12,
        y: "Dolor"
      },
      {
        id: "West",
        x: 13,
        y: "Dolor"
      }, 
      {
        id: "Central",
        x: 3,
        y: "Sit"
      },
      {
        id: "East",
        x: 21,
        y: "Sit"
      },
      {
        id: "West",
        x: 31,
        y: "Sit"
      }, 
      {
        id: "Central",
        x: 2,
        y: "Amet"
      },
      {
        id: "East",
        x: 42,
        y: "Amet"
      },
      {
        id: "West",
        x: 231,
        y: "Amet"
      }, 
      {
        id: "South",
        x: 154,
        y: "Amet"
      },
      {
        id: "North",
        x: 79,
        y: "Amet"
      }                           
    ],
    alignment: "horizontal",
    type: "Grouped",
    title: "Grouped Horizontal Bar Chart",
    width: 500,
    height: 300,
    marginLeft: 35,
  },
};

export const Horizontal: Story = {
  args: {
    data: [
      {
        x: 3,
        y: "Dolor"
      },
      {
        x: 21,
        y: "Sit"
      },
      {
        x: 31,
        y: "Amet"
      },                       
    ],
    alignment: "horizontal",
    type: "normal",
    title: "Horizontal Bar Chart",
    width: 500,
    height: 300,
    marginLeft: 35,
  },
};

export const Vertical: Story = {
  args: {
    data: [
      {
        x: "Dolor",
        y: 20
      },
      {
        x: "Sit",
        y: 42
      },
      {
        x: "Amet",
        y: 10
      },                       
    ],
    alignment: "vertical",
    type: "normal",
    title: "Vertical Bar Chart",
    width: 500,
    height: 300,
    marginLeft: 35,
  },
};

export const StackedVertical: Story = {
  args: {
    data: [
      {
        id: "Central",
        y: 3,
        x: "Dolor"
      },
      {
        id: "East",
        y: 12,
        x: "Dolor"
      },
      {
        id: "West",
        y: 13,
        x: "Dolor"
      }, 
      {
        id: "Central",
        y: 3,
        x: "Sit"
      },
      {
        id: "East",
        y: 21,
        x: "Sit"
      },
      {
        id: "West",
        y: 31,
        x: "Sit"
      }, 
      {
        id: "Central",
        y: 2,
        x: "Amet"
      },
      {
        id: "East",
        y: 42,
        x: "Amet"
      },
      {
        id: "West",
        y: 231,
        x: "Amet"
      }, 
      {
        id: "South",
        y: 154,
        x: "Amet"
      },
      {
        id: "North",
        y: 79,
        x: "Amet"
      }                           
    ],
    alignment: "vertical",
    type: "stacked",
    title: "Stacked Vertical Bar Chart",
    width: 500,
    height: 300,
    marginLeft: 35,
  },
};

export const GroupedVertical: Story = {
  args: {
    data: [
      {
        id: "Central",
        y: 3,
        x: "Dolor"
      },
      {
        id: "East",
        y: 12,
        x: "Dolor"
      },
      {
        id: "West",
        y: 13,
        x: "Dolor"
      }, 
      {
        id: "Central",
        y: 3,
        x: "Sit"
      },
      {
        id: "East",
        y: 21,
        x: "Sit"
      },
      {
        id: "West",
        y: 31,
        x: "Sit"
      }, 
      {
        id: "Central",
        y: 2,
        x: "Amet"
      },
      {
        id: "East",
        y: 42,
        x: "Amet"
      },
      {
        id: "West",
        y: 231,
        x: "Amet"
      }, 
      {
        id: "South",
        y: 154,
        x: "Amet"
      },
      {
        id: "North",
        y: 79,
        x: "Amet"
      }                           
    ],
    alignment: "vertical",
    type: "Grouped",
    title: "Grouped Vertical Bar Chart",
    width: 500,
    height: 300,
    marginLeft: 35,
  },
};

export const Empty: Story = {
    args: {
      data: [],
      width: 500,
      height: 300,
    },
  };
