import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import {
  List,
  ListItemProps,
} from '@kitten/ui';
import {
  ThemedComponentProps,
  ThemeProvider,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { ThemeCard } from './themeCard.component';
import { Theme } from './type';

interface ComponentProps {
  data: Theme[];
  currentTheme: string;
  onToggleTheme: (name: string) => void;
}

type ThemesProps = ThemedComponentProps & ComponentProps;

class ThemesComponent extends React.Component<ThemesProps> {

  private onItemPress = (index: number) => {
    const { [index]: theme } = this.props.data;

    this.props.onToggleTheme(theme.name);
  };

  private renderItem = (info: ListRenderItemInfo<Theme>): React.ReactElement<ListItemProps> => {
    const isDisabled: boolean = this.props.currentTheme === info.item.name;

    return (
      <ThemeProvider theme={info.item.theme}>
        <ThemeCard
          style={this.props.themedStyle.item}
          title={info.item.name}
          disabled={false}
          onPress={() => {
            this.onItemPress(info.index);
          }}
        />
      </ThemeProvider>
    );
  };

  public render(): React.ReactNode {
    const { themedStyle, data } = this.props;

    return (
      <List
        style={themedStyle.container}
        contentContainerStyle={themedStyle.contentContainer}
        data={data}
        renderItem={this.renderItem}
      />
    );
  }
}

export const Themes = withStyles(ThemesComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: theme['background-color-default-2'],
  },
  item: {
    marginVertical: 8,
  },
}));
