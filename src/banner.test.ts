import { render } from '@inquirer/testing';
import selectWithBanner, { type SelectWithBannerConfig } from './index.ts';
import { expect } from 'chai';
import { normalizeOutput } from './test-utils.ts';

const numberedChoices = [
  { value: '1' },
  { value: '2' },
  { value: '3' },
  { value: '4' },
  { value: '5' },
  { value: '6' },
] as const;

const numberMap = {
  '1': 'One',
  '2': 'Two',
  '3': 'Three',
  '4': 'Four',
  '5': 'Five',
  '6': 'Six',
} as const;

describe('banner', () => {
  it('should receive the current choice and update the banner', async () => {
    const { events, getScreen } = await render<SelectWithBannerConfig, unknown>(selectWithBanner, {
      message: 'Select a number',
      choices: numberedChoices,
      pageSize: 6,
      banner: choice => numberMap[choice.value as keyof typeof numberMap],
    });

    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      One
      ? Select a number (Use arrow keys)
      ❯ 1
        2
        3
        4
        5
        6
    `),
    );

    events.keypress('down');
    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      Two
      ? Select a number
        1
      ❯ 2
        3
        4
        5
        6
    `),
    );

    events.keypress('down');
    // console.log(getScreen());

    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      Three
      ? Select a number
        1
        2
      ❯ 3
        4
        5
        6
    `),
    );

    events.keypress('down');
    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      Four
      ? Select a number
        1
        2
        3
      ❯ 4
        5
        6
    `),
    );

    events.keypress('down');
    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      Five
      ? Select a number
        1
        2
        3
        4
      ❯ 5
        6
    `),
    );

    events.keypress('down');
    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      Six
      ? Select a number
        1
        2
        3
        4
        5
      ❯ 6
    `),
    );

    events.keypress('down');
    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      One
      ? Select a number
      ❯ 1
        2
        3
        4
        5
        6
    `),
    );
  });

  it('Should clear the banner when done', async () => {
    const { answer, events, getScreen } = await render<SelectWithBannerConfig, unknown>(selectWithBanner, {
      message: 'Select a number',
      choices: numberedChoices,
      pageSize: 6,
      banner: choice => numberMap[choice.value as keyof typeof numberMap],
    });

    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      One
      ? Select a number (Use arrow keys)
      ❯ 1
        2
        3
        4
        5
        6
    `),
    );

    events.keypress('down');
    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      Two
      ? Select a number
        1
      ❯ 2
        3
        4
        5
        6
    `),
    );

    events.keypress('enter');
    expect(normalizeOutput(getScreen())).to.equal(normalizeOutput('"✔ Select a number 2"'));

    await expect(answer).to.eventually.be.fulfilled.and.to.equal('2');
  });

  it('Should use the previous value if banner state returns null', async () => {
    const { events, getScreen } = await render<SelectWithBannerConfig, unknown>(selectWithBanner, {
      message: 'Select a number',
      choices: numberedChoices,
      pageSize: 6,
      banner: choice => {
        const value = numberMap[choice.value as keyof typeof numberMap];

        // For some reason we don't like the number 3
        if (value === 'Three') return null;
        return value;
      },
    });

    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      One
      ? Select a number (Use arrow keys)
      ❯ 1
        2
        3
        4
        5
        6
    `),
    );

    events.keypress('down');
    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      Two
      ? Select a number
        1
      ❯ 2
        3
        4
        5
        6
    `),
    );

    events.keypress('down');
    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      Two
      ? Select a number
        1
        2
      ❯ 3
        4
        5
        6
    `),
    );

    events.keypress('down');
    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      Four
      ? Select a number
        1
        2
        3
      ❯ 4
        5
        6
    `),
    );

    events.keypress('up');
    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      Four
      ? Select a number
        1
        2
      ❯ 3
        4
        5
        6
    `),
    );

    events.keypress('up');
    expect(normalizeOutput(getScreen())).to.equal(
      normalizeOutput(`
      Two
      ? Select a number
        1
      ❯ 2
        3
        4
        5
        6
    `),
    );
  });
});
