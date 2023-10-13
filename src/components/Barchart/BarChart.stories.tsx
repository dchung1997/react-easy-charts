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

export const Primary: Story = {
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

export const Empty: Story = {
    args: {
      data: [],
      width: 500,
      height: 300,
    },
  };
