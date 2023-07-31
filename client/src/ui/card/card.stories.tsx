import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "@/ui";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {},
  render() {
    return <Card>default</Card>;
  },
};
