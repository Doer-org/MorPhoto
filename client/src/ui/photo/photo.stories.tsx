/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { Photo } from "@/ui";
import { useRef } from "react";

const meta: Meta<typeof Photo> = {
  title: "UI/Photo",
  component: Photo,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Photo>;

export const Default: Story = {
  args: {
    variant: "square",
    src: "/assets/nijika1.png",
    width: 300,
    height: 300,
  },
  render(args) {
    return (
      <div>
        <Photo {...args} />
      </div>
    );
  },
};

export const Catalog: Story = {
  args: {},
  render(args) {
    const refSquare = useRef<HTMLImageElement>(null);
    return (
      <div
        style={{
          display: "inline-flex",
          gap: "1rem",
        }}
      >
        <Photo
          {...args}
          src="/assets/nijika1.png"
          variant="square"
          ref={refSquare}
        />
        <Photo {...args} src="/assets/nijika2.png" variant="rounded" />
      </div>
    );
  },
};
