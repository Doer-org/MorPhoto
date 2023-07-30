import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/ui";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {},
  render() {
    return (
      <div
        style={{
          display: "inline-flex",
          gap: "1rem",
        }}
      >
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
    );
  },
};
