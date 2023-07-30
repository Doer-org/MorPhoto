import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "@/ui";

const meta: Meta<typeof Header> = {
  title: "UI/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ height: "150vh" }}>
        <Story />
        <div>
          <p>Scroll Area</p>
          <p>Scroll Area</p>
          <p>Scroll Area</p>
          <p>Scroll Area</p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
  render() {
    return <Header leftChildren={"MorPhoto"} rightChildren={"icon"} />;
  },
};
