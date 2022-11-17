import { Menu, MenuHandler, MenuItem, MenuList, Tooltip } from '@material-tailwind/react';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../redux/features/authSlice';
import { Props } from './AccountMenu.type';

const AccountMenu: FC<Props> = ({ closeNav }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    closeNav();
    dispatch(logOut());
  }, [dispatch, closeNav]);

  return (
    <div className="ml-auto">
      <Menu>
        <MenuHandler>
          <div className="flex">
            <Tooltip content={t('tooltip.account')} className="bg-blue-gray-900 text-xs capitalize">
              <span className="material-icons cursor-pointer">manage_accounts</span>
            </Tooltip>
          </div>
        </MenuHandler>
        <MenuList className="min-w-max">
          <MenuItem className="first-letter:capitalize">
            <Link to="/edit/profile">{t('profile.edit')}</Link>
          </MenuItem>
          <MenuItem onClick={onLogout} className="first-letter:capitalize">
            <Link to="/">{t('logout')}</Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default AccountMenu;
