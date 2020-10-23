import React from 'react';
import { Switch } from 'antd';
import {IconFont} from '@/assets/fonts';
import {initTheme} from '@/assets/css/theme/theme'

export const SwitchTheme = () => {
    const switchTheme = (e) => {
        initTheme(e);
    }
    return (
        <div>
            <Switch
                checkedChildren={<IconFont type='icon-sun' />}
                unCheckedChildren={<IconFont type='icon-moon_zzz_fill'  />}
                defaultChecked
                onChange={(e) => switchTheme(e)}
            />
        </div>
    )
}

// export default SwitchTheme;