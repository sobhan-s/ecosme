import * as LuIcons from 'react-icons/lu';

const DynamicIcon = ({ name }: { name?: string }) => {
  const IconComponent = LuIcons[name as keyof typeof LuIcons];

  if (!IconComponent) {
    return <LuIcons.LuCircleHelp />;
  }

  return <IconComponent />;
};

export { DynamicIcon };
