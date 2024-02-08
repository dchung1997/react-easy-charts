import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import PieChart from './PieChart'

const meta: Meta<typeof PieChart> = {
    title: "Components/PieChart",
    component: PieChart,
    tags: ['autodocs'],    
};

export default meta;

type Story = StoryObj<typeof PieChart>;

export const Donut: Story = {
    args: {
      data: [{"name": "<5", "value": 19912018}, {"name": "5-9", "value": 20501982}, {"name": "10-14", "value": 20679786}, {"name": "15-19", "value": 21354481}, {"name": "20-24", "value": 22604232}, {"name": "25-29", "value": 21698010}, {"name": "30-34", "value": 21183639}, {"name": "35-39", "value": 19855782}, {"name": "40-44", "value": 20796128}, {"name": "45-49", "value": 21370368}, {"name": "50-54", "value": 22525490}, {"name": "55-59", "value": 21001947}, {"name": "60-64", "value": 18415681}, {"name": "65-69", "value": 14547446}, {"name": "70-74", "value": 10587721}, {"name": "75-79", "value": 7730129}, {"name": "80-84", "value": 5811429}, {"name": "\u226585", "value": 5938752}],
      title: "U.S. Census Data",
      titleAlignment: "center",
      width: 500,
      height: 400,
      marginLeft: 30,
      toolTipFormat: "0.0f",
      radiusInner: 0.67,
      radiusOuter: 1,
    },
  };

export const Pie: Story = {
    args: {
      data: [{"name": "<5", "value": 19912018}, {"name": "5-9", "value": 20501982}, {"name": "10-14", "value": 20679786}, {"name": "15-19", "value": 21354481}, {"name": "20-24", "value": 22604232}, {"name": "25-29", "value": 21698010}, {"name": "30-34", "value": 21183639}, {"name": "35-39", "value": 19855782}, {"name": "40-44", "value": 20796128}, {"name": "45-49", "value": 21370368}, {"name": "50-54", "value": 22525490}, {"name": "55-59", "value": 21001947}, {"name": "60-64", "value": 18415681}, {"name": "65-69", "value": 14547446}, {"name": "70-74", "value": 10587721}, {"name": "75-79", "value": 7730129}, {"name": "80-84", "value": 5811429}, {"name": "\u226585", "value": 5938752}],
      title: "U.S. Census Data",
      titleAlignment: "center",
      width: 500,
      height: 400,
      marginLeft: 30,
      toolTipFormat: "0.0f",
      radiusInner: 0,
      radiusOuter: 1,
    },
  };
